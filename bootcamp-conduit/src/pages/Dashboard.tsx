// // import { BookOpen, Users, DollarSign, FileCheck } from "lucide-react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import Layout from "@/components/Layout";

// // const stats = [
// //   {
// //     title: "Total Courses",
// //     value: "24",
// //     icon: BookOpen,
// //     trend: "+3 this month",
// //     color: "text-primary",
// //     bgColor: "bg-primary/10",
// //   },
// //   {
// //     title: "Total Students",
// //     value: "1,234",
// //     icon: Users,
// //     trend: "+180 this month",
// //     color: "text-success",
// //     bgColor: "bg-success/10",
// //   },
// //   {
// //     title: "Active Paid Courses",
// //     value: "8",
// //     icon: DollarSign,
// //     trend: "+2 this month",
// //     color: "text-warning",
// //     bgColor: "bg-warning/10",
// //   },
// //   {
// //     title: "Pending Assignments",
// //     value: "42",
// //     icon: FileCheck,
// //     trend: "12 new today",
// //     color: "text-destructive",
// //     bgColor: "bg-destructive/10",
// //   },
// // ];

// // const recentActivity = [
// //   { student: "John Doe", action: "Enrolled in", course: "Web Development Bootcamp", time: "2 hours ago" },
// //   { student: "Jane Smith", action: "Completed", course: "React Fundamentals", time: "4 hours ago" },
// //   { student: "Mike Johnson", action: "Submitted assignment for", course: "JavaScript Advanced", time: "5 hours ago" },
// //   { student: "Sarah Williams", action: "Made payment for", course: "Full Stack Course", time: "1 day ago" },
// // ];

// // const Dashboard = () => {
// //   return (
// //     <Layout>
// //       <div className="space-y-6">
// //         <div>
// //           <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, Admin!</h2>
// //           <p className="text-muted-foreground mt-1">Here's what's happening with your bootcamp today.</p>
// //         </div>

// //         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
// //           {stats.map((stat) => (
// //             <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow">
// //               <CardHeader className="flex flex-row items-center justify-between pb-2">
// //                 <CardTitle className="text-sm font-medium text-muted-foreground">
// //                   {stat.title}
// //                 </CardTitle>
// //                 <div className={`p-2 rounded-lg ${stat.bgColor}`}>
// //                   <stat.icon className={`h-5 w-5 ${stat.color}`} />
// //                 </div>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="text-3xl font-bold text-foreground">{stat.value}</div>
// //                 <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </div>

// //         <div className="grid gap-6 md:grid-cols-2">
// //           <Card className="shadow-card">
// //             <CardHeader>
// //               <CardTitle>Recent Activity</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 {recentActivity.map((activity, index) => (
// //                   <div key={index} className="flex flex-col space-y-1 pb-4 border-b last:border-0 last:pb-0">
// //                     <div className="flex items-start justify-between">
// //                       <div className="space-y-1">
// //                         <p className="text-sm font-medium">
// //                           <span className="text-foreground">{activity.student}</span>
// //                           <span className="text-muted-foreground"> {activity.action} </span>
// //                           <span className="text-primary">{activity.course}</span>
// //                         </p>
// //                         <p className="text-xs text-muted-foreground">{activity.time}</p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="shadow-card">
// //             <CardHeader>
// //               <CardTitle>Course Engagement</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 {[
// //                   { name: "Web Development", students: 245, percentage: 85 },
// //                   { name: "React Advanced", students: 189, percentage: 72 },
// //                   { name: "Full Stack", students: 156, percentage: 65 },
// //                   { name: "JavaScript Pro", students: 134, percentage: 58 },
// //                 ].map((course) => (
// //                   <div key={course.name} className="space-y-2">
// //                     <div className="flex items-center justify-between text-sm">
// //                       <span className="font-medium text-foreground">{course.name}</span>
// //                       <span className="text-muted-foreground">{course.students} students</span>
// //                     </div>
// //                     <div className="w-full bg-secondary rounded-full h-2">
// //                       <div
// //                         className="bg-gradient-primary h-2 rounded-full transition-all"
// //                         style={{ width: `${course.percentage}%` }}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default Dashboard;




// import { useEffect, useState } from "react";
// import { BookOpen, Users, DollarSign, GraduationCap } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Layout from "@/components/Layout";

// interface Student {
//   id: number;
//   name: string;
//   email: string;
// }

// interface Course {
//   id: number;
//   title: string;
//   type: string;
//   price: string | null;
//   total_students: number;
//   students: Student[];
// }

// const Dashboard = () => {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOverview = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/admin/overview");
//         const result = await res.json();
//         setData(result);
//       } catch (err) {
//         console.error("Error fetching overview:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOverview();
//   }, []);

//   if (loading) {
//     return (
//       <Layout>
//         <div className="text-center text-muted-foreground">Loading dashboard...</div>
//       </Layout>
//     );
//   }

//   if (!data) {
//     return (
//       <Layout>
//         <div className="text-center text-destructive">Error loading data.</div>
//       </Layout>
//     );
//   }

//   const stats = [
//     {
//       title: "Total Students",
//       value: data.stats.total_students,
//       icon: Users,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       title: "Total Courses",
//       value: data.stats.total_courses,
//       icon: BookOpen,
//       color: "text-indigo-600",
//       bgColor: "bg-indigo-100",
//     },
//     {
//       title: "Free Courses",
//       value: data.stats.free_courses,
//       icon: GraduationCap,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       title: "Paid Courses",
//       value: data.stats.paid_courses,
//       icon: DollarSign,
//       color: "text-amber-600",
//       bgColor: "bg-amber-100",
//     },
//     {
//       title: "Total Enrollments",
//       value: data.stats.total_enrollments,
//       icon: Users,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//   ];

//   return (
//     <Layout>
//       <div className="space-y-8">
//         <div>
//           <h2 className="text-3xl font-bold text-foreground">Welcome back, Admin!</h2>
//           <p className="text-muted-foreground mt-1">
//             Here's a quick summary of your bootcamp activity.
//           </p>
//         </div>

//         {/* Stats Section */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
//           {stats.map((stat) => (
//             <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                 <div className={`p-2 rounded-lg ${stat.bgColor}`}>
//                   <stat.icon className={`h-5 w-5 ${stat.color}`} />
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-2xl font-semibold">{stat.value}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Course Overview Section */}
//         <div>
//           <h3 className="text-xl font-semibold text-foreground mb-3">Course Overview</h3>
//           <div className="grid gap-6 md:grid-cols-2">
//             {data.courses.map((course: Course) => (
//               <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow">
//                 <CardHeader>
//                   <CardTitle className="flex justify-between items-center">
//                     <span>{course.title}</span>
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full ${
//                         course.type === "paid"
//                           ? "bg-amber-100 text-amber-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {course.type.toUpperCase()}
//                     </span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm text-muted-foreground mb-2">
//                     Total Students: <span className="font-semibold">{course.total_students}</span>
//                   </p>

//                   {course.students.length > 0 ? (
//                     <div className="space-y-1">
//                       {course.students.slice(0, 3).map((s) => (
//                         <p key={s.id} className="text-sm">
//                           👤 {s.name} — <span className="text-muted-foreground">{s.email}</span>
//                         </p>
//                       ))}
//                       {course.students.length > 3 && (
//                         <p className="text-xs text-muted-foreground">
//                           +{course.students.length - 3} more
//                         </p>
//                       )}
//                     </div>
//                   ) : (
//                     <p className="text-sm text-muted-foreground">No students yet.</p>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;




import { useEffect, useState } from "react";
import { BookOpen, Users, DollarSign, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";

interface Student {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
  type: string;
  price: string | null;
  total_students: number;
  students: Student[];
}

interface OverviewData {
  stats: {
    total_students: number;
    total_courses: number;
    free_courses: number;
    paid_courses: number;
    total_enrollments: number;
  };
  courses: Course[];
}

const Dashboard = () => {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch("http://localhost:8000/admin/overview");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching overview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="text-center text-muted-foreground">Loading dashboard...</div>
      </Layout>
    );
  }

  if (!data?.stats) {
    return (
      <Layout>
        <div className="text-center text-destructive">No data available</div>
      </Layout>
    );
  }

  const stats = [
    {
      title: "Total Students",
      value: data?.stats?.total_students ?? 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Courses",
      value: data?.stats?.total_courses ?? 0,
      icon: BookOpen,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Free Courses",
      value: data?.stats?.free_courses ?? 0,
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Paid Courses",
      value: data?.stats?.paid_courses ?? 0,
      icon: DollarSign,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Total Enrollments",
      value: data?.stats?.total_enrollments ?? 0,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome back, Admin!</h2>
          <p className="text-muted-foreground mt-1">
            Here's a quick summary of your bootcamp activity.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Overview Section */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-3">Course Overview</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {data?.courses?.map((course) => (
              <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{course.title}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        course.type === "paid"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {course.type.toUpperCase()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Students: <span className="font-semibold">{course.total_students}</span>
                  </p>

                  {course.students.length > 0 ? (
                    <div className="space-y-1">
                      {course.students.slice(0, 3).map((s) => (
                        <p key={s.id} className="text-sm">
                          👤 {s.name} — <span className="text-muted-foreground">{s.email}</span>
                        </p>
                      ))}
                      {course.students.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{course.students.length - 3} more
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No students yet.</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
