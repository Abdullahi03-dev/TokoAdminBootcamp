// import { useEffect, useState } from "react";
// import { Plus } from "lucide-react";
// import Layout from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";
// import axios from "axios";

// interface Course {
//   id: number;
//   title: string;
// }

// interface Assignment {
//   id: number;
//   course_id: number;
//   title: string;
//   instructions: string;
// }

// interface Submission {
//   id: number;
//   student_id: number;
//   assignment_id: number;
//   submitted_link: string;
//   grade: string;
//   submitted_at: string;
// }

// const Assignments = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [assignments, setAssignments] = useState<Assignment[]>([]);
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [newAssignment, setNewAssignment] = useState({
//     course_id: "",
//     title: "",
//     instructions: "",
//   });

//   const BASE_URL = "http://localhost:8000/assignments";

//   useEffect(() => {
//     fetchCourses();
//     fetchAssignments();
//     fetchSubmissions();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/courses`);
//       setCourses(res.data.courses);
//     } catch {
//       toast.error("Failed to fetch courses");
//     }
//   };

//   const fetchAssignments = async () => {
//     try {
//       const res = await axios.get(BASE_URL);
//       setAssignments(res.data.assignments);
//     } catch {
//       toast.error("Failed to fetch assignments");
//     }
//   };

//   const fetchSubmissions = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/submissions`);
//       setSubmissions(res.data.submissions);
//     } catch {
//       toast.error("Failed to fetch submissions");
//     }
//   };

//   const handleGrade = async (id: number, grade: string) => {
//     try {
//       await axios.put(`${BASE_URL}/grade/${id}?grade=${grade}`);
//       toast.success(`Submission graded as ${grade}`);
//       fetchSubmissions();
//     } catch {
//       toast.error("Error grading submission");
//     }
//   };

//   const handleCreateAssignment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `${BASE_URL}?course_id=${newAssignment.course_id}&title=${newAssignment.title}&instructions=${newAssignment.instructions}`
//       );
//       toast.success("Assignment created successfully!");
//       setIsDialogOpen(false);
//       setNewAssignment({ course_id: "", title: "", instructions: "" });
//       fetchAssignments();
//     } catch {
//       toast.error("Error creating assignment");
//     }
//   };

//   const pendingCount = submissions.filter((s) => s.grade === "Pending").length;

//   return (
//     <Layout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-3xl font-bold">Assignments</h2>
//             <p className="text-muted-foreground">Manage and review student submissions</p>
//           </div>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button className="gap-2">
//                 <Plus className="h-4 w-4" /> Create Assignment
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Create New Assignment</DialogTitle>
//                 <DialogDescription>
//                   Select a course and fill in assignment details
//                 </DialogDescription>
//               </DialogHeader>

//               <form className="space-y-4" onSubmit={handleCreateAssignment}>
//                 <div>
//                   <Label>Course</Label>
//                   <Select
//                     onValueChange={(val) =>
//                       setNewAssignment({ ...newAssignment, course_id: val })
//                     }
//                     value={newAssignment.course_id}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a course" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {courses.map((course) => (
//                         <SelectItem key={course.id} value={course.id.toString()}>
//                           {course.title}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label>Assignment Title</Label>
//                   <Input
//                     placeholder="Enter assignment title"
//                     value={newAssignment.title}
//                     onChange={(e) =>
//                       setNewAssignment({ ...newAssignment, title: e.target.value })
//                     }
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label>Instructions</Label>
//                   <Textarea
//                     placeholder="Add assignment instructions"
//                     value={newAssignment.instructions}
//                     onChange={(e) =>
//                       setNewAssignment({ ...newAssignment, instructions: e.target.value })
//                     }
//                     rows={4}
//                     required
//                   />
//                 </div>

//                 <div className="flex justify-end gap-2 pt-4">
//                   <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button type="submit">Save</Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Stats */}
//         <div className="grid gap-6 md:grid-cols-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Total Assignments</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">{assignments.length}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Pending Reviews</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Graded</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-green-600">
//                 {submissions.length - pendingCount}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Submissions Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>All Submissions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Student</TableHead>
//                   <TableHead>Assignment</TableHead>
//                   <TableHead>Link</TableHead>
//                   <TableHead>Submitted</TableHead>
//                   <TableHead>Grade</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {submissions.map((s) => (
//                   <TableRow key={s.id}>
//                     <TableCell>{s.student_id}</TableCell>
//                     <TableCell>{s.assignment_id}</TableCell>
//                     <TableCell>
//                       <a
//                         href={s.submitted_link}
//                         target="_blank"
//                         className="text-blue-600 hover:underline"
//                       >
//                         View
//                       </a>
//                     </TableCell>
//                     <TableCell>
//                       {new Date(s.submitted_at).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell>
//                       <Badge>{s.grade}</Badge>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       {s.grade === "Pending" && (
//                         <Select onValueChange={(val) => handleGrade(s.id, val)}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Grade" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="Fair">Fair</SelectItem>
//                             <SelectItem value="Good">Good</SelectItem>
//                             <SelectItem value="Excellent">Excellent</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </Layout>
//   );
// };

// export default Assignments;






import { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

interface Course {
  id: number;
  title: string;
}

interface Assignment {
  id: number;
  course_id: number;
  title: string;
  instructions: string;
}

interface Submission {
  id: number;
  student_id: number;
  assignment_id: number;
  submitted_link: string;
  grade: string;
  submitted_at: string;
}

const Assignments = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <-- added loader state
  const [newAssignment, setNewAssignment] = useState({
    course_id: "",
    title: "",
    instructions: "",
  });

  const BASE_URL = "http://localhost:8000/assignments";

  useEffect(() => {
    fetchCourses();
    fetchAssignments();
    fetchSubmissions();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/courses`);
      setCourses(res.data.courses);
    } catch {
      toast.error("Failed to fetch courses");
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setAssignments(res.data.assignments);
    } catch {
      toast.error("Failed to fetch assignments");
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/submissions`);
      setSubmissions(res.data.submissions);
    } catch {
      toast.error("Failed to fetch submissions");
    }
  };

  const handleGrade = async (id: number, grade: string) => {
    try {
      await axios.put(`${BASE_URL}/grade/${id}?grade=${grade}`);
      toast.success(`Submission graded as ${grade}`);
      fetchSubmissions();
    } catch {
      toast.error("Error grading submission");
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true); // start loader
      await axios.post(
        `${BASE_URL}?course_id=${newAssignment.course_id}&title=${newAssignment.title}&instructions=${newAssignment.instructions}`
      );
      toast.success("Assignment created successfully!");
      setIsDialogOpen(false);
      setNewAssignment({ course_id: "", title: "", instructions: "" });
      fetchAssignments();
    } catch {
      toast.error("Error creating assignment");
    } finally {
      setIsLoading(false); // stop loader
    }
  };

  const pendingCount = submissions.filter((s) => s.grade === "Pending").length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Assignments</h2>
            <p className="text-muted-foreground">Manage and review student submissions</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  Select a course and fill in assignment details
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleCreateAssignment}>
                <div>
                  <Label>Course</Label>
                  <Select
                    onValueChange={(val) =>
                      setNewAssignment({ ...newAssignment, course_id: val })
                    }
                    value={newAssignment.course_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Assignment Title</Label>
                  <Input
                    placeholder="Enter assignment title"
                    value={newAssignment.title}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Instructions</Label>
                  <Textarea
                    placeholder="Add assignment instructions"
                    value={newAssignment.instructions}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, instructions: e.target.value })
                    }
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} className="gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{assignments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Graded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {submissions.length - pendingCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.student_id}</TableCell>
                    <TableCell>{s.assignment_id}</TableCell>
                    <TableCell>
                      <a
                        href={s.submitted_link}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </TableCell>
                    <TableCell>
                      {new Date(s.submitted_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge>{s.grade}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {s.grade === "Pending" && (
                        <Select onValueChange={(val) => handleGrade(s.id, val)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Excellent">Excellent</SelectItem>
                          </SelectContent>
                        </Select>
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

export default Assignments;




