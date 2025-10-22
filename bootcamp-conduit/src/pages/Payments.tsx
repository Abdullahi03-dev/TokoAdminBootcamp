import { useState } from "react";
import { DollarSign, CheckCircle, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface Payment {
  id: string;
  student: string;
  course: string;
  amount: string;
  date: string;
  status: "pending" | "confirmed";
}

const mockPayments: Payment[] = [
  {
    id: "1",
    student: "Sarah Williams",
    course: "Full Stack Development",
    amount: "$499",
    date: "2024-01-15",
    status: "confirmed",
  },
  {
    id: "2",
    student: "Tom Brown",
    course: "React Advanced",
    amount: "$299",
    date: "2024-01-14",
    status: "pending",
  },
  {
    id: "3",
    student: "Emily Davis",
    course: "Full Stack Development",
    amount: "$499",
    date: "2024-01-13",
    status: "confirmed",
  },
];

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);

  const handleConfirm = (id: string) => {
    setPayments(payments.map(p =>
      p.id === id ? { ...p, status: "confirmed" as const } : p
    ));
    toast.success("Payment confirmed");
  };

  const totalRevenue = payments
    .filter(p => p.status === "confirmed")
    .reduce((sum, p) => sum + parseInt(p.amount.replace("$", "")), 0);

  const pendingCount = payments.filter(p => p.status === "pending").length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Payments</h2>
          <p className="text-muted-foreground mt-1">Track revenue from paid courses</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-success" />
                <div className="text-3xl font-bold text-foreground">${totalRevenue}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {payments.filter(p => p.status === "confirmed").length}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{pendingCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Payment Account Details</CardTitle>
            <CardDescription>Account information displayed to students for payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
                <p className="text-foreground">Example Bank</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                <p className="text-foreground">1234567890</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Name</p>
                <p className="text-foreground">Bootcamp Inc.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Routing Number</p>
                <p className="text-foreground">021000021</p>
              </div>
            </div>
            <Button variant="outline">Update Account Details</Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>View and manage payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.student}</TableCell>
                    <TableCell>{payment.course}</TableCell>
                    <TableCell className="font-semibold">{payment.amount}</TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={payment.status === "confirmed" ? "default" : "secondary"}>
                        {payment.status === "confirmed" ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Confirmed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {payment.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleConfirm(payment.id)}
                        >
                          Mark as Confirmed
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Payments;