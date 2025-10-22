// // import { useEffect, useState } from "react";
// // import { Plus, Edit, Trash2, Calendar } from "lucide-react";
// // import Layout from "@/components/Layout";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { toast } from "sonner";

// // interface Announcement {
// //   id: number;
// //   title: string;
// //   description: string;
// //   date: string;
// //   link?: string;
// // }

// // const Announcements = () => {
// //   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const [editId, setEditId] = useState<number | null>(null);
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     link: "",
// //   });

// //   // const email = localStorage.getItem("emailBootcamp");

// //   // Fetch announcements
// //   const fetchAnnouncements = async () => {
// //     try {
// //       const res = await fetch("http://localhost:8000/announcements");
// //       const data = await res.json();
// //       setAnnouncements(data);
// //     } catch {
// //       toast.error("Failed to fetch announcements");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAnnouncements();
// //   }, []);

// //   // ➕ Create or Update announcement
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const method = editId ? "PUT" : "POST";
// //     const url = editId
// //       ? `http://localhost:8000/announcements/${editId}`
// //       : "http://localhost:8000/announcements";

// //     try {
// //       const res = await fetch(url, {
// //         method,
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       if (!res.ok) throw new Error("Request failed");

// //       toast.success(editId ? "Announcement updated!" : "Announcement created!");
// //       setIsDialogOpen(false);
// //       setEditId(null);
// //       setFormData({ title: "", description: "", link: "" });
// //       fetchAnnouncements();
// //     } catch {
// //       toast.error("Operation failed");
// //     }
// //   };

// //   // ❌ Delete
// //   const handleDelete = async (id: number) => {
// //     try {
// //       await fetch(`http://localhost:8000/announcements/${id}`, {
// //         method: "DELETE",
// //       });
// //       toast.success("Deleted");
// //       setAnnouncements((prev) => prev.filter((a) => a.id !== id));
// //     } catch {
// //       toast.error("Delete failed");
// //     }
// //   };

// //   // ✏️ Edit
// //   const handleEdit = (announcement: Announcement) => {
// //     setEditId(announcement.id);
// //     setFormData({
// //       title: announcement.title,
// //       description: announcement.description,
// //       link: announcement.link || "",
// //     });
// //     setIsDialogOpen(true);
// //   };

// //   return (
// //     <Layout>
// //       <div className="space-y-6">
// //         {/* Header */}
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <h2 className="text-3xl font-bold tracking-tight text-foreground">
// //               Announcements
// //             </h2>
// //             <p className="text-muted-foreground mt-1">
// //               Communicate with your students
// //             </p>
// //           </div>

// //           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //             <DialogTrigger asChild>
// //               <Button
// //                 className="gap-2"
// //                 onClick={() => {
// //                   setEditId(null);
// //                   setFormData({ title: "", description: "", link: "" });
// //                 }}
// //               >
// //                 <Plus className="h-4 w-4" />
// //                 New Announcement
// //               </Button>
// //             </DialogTrigger>
// //             <DialogContent>
// //               <DialogHeader>
// //                 <DialogTitle>
// //                   {editId ? "Edit Announcement" : "Create Announcement"}
// //                 </DialogTitle>
// //                 <DialogDescription>
// //                   {editId
// //                     ? "Update announcement details"
// //                     : "Share important updates with your students"}
// //                 </DialogDescription>
// //               </DialogHeader>

// //               <form onSubmit={handleSubmit} className="space-y-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="title">Title</Label>
// //                   <Input
// //                     id="title"
// //                     value={formData.title}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, title: e.target.value })
// //                     }
// //                     placeholder="Announcement title"
// //                     required
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="description">Description</Label>
// //                   <Textarea
// //                     id="description"
// //                     rows={4}
// //                     value={formData.description}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, description: e.target.value })
// //                     }
// //                     placeholder="Announcement details"
// //                     required
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="link">Link (optional)</Label>
// //                   <Input
// //                     id="link"
// //                     type="url"
// //                     value={formData.link}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, link: e.target.value })
// //                     }
// //                     placeholder="https://..."
// //                   />
// //                 </div>

// //                 <div className="flex justify-end gap-2 pt-4">
// //                   <Button
// //                     type="button"
// //                     variant="outline"
// //                     onClick={() => setIsDialogOpen(false)}
// //                   >
// //                     Cancel
// //                   </Button>
// //                   <Button type="submit">
// //                     {editId ? "Save Changes" : "Publish"}
// //                   </Button>
// //                 </div>
// //               </form>
// //             </DialogContent>
// //           </Dialog>
// //         </div>

// //         {/* Announcements List */}
// //         <div className="grid gap-6">
// //           {announcements.map((a) => (
// //             <Card
// //               key={a.id}
// //               className="shadow-card hover:shadow-elevated transition-shadow"
// //             >
// //               <CardHeader>
// //                 <div className="flex items-start justify-between">
// //                   <div className="space-y-1">
// //                     <CardTitle>{a.title}</CardTitle>
// //                     <CardDescription className="flex items-center gap-2">
// //                       <Calendar className="h-4 w-4" />
// //                       {new Date(a.date).toLocaleDateString("en-US", {
// //                         year: "numeric",
// //                         month: "long",
// //                         day: "numeric",
// //                       })}
// //                     </CardDescription>
// //                   </div>

// //                   <div className="flex gap-2">
// //                     <Button
// //                       variant="ghost"
// //                       size="icon"
// //                       onClick={() => handleEdit(a)}
// //                     >
// //                       <Edit className="h-4 w-4" />
// //                     </Button>
// //                     <Button
// //                       variant="ghost"
// //                       size="icon"
// //                       onClick={() => handleDelete(a.id)}
// //                     >
// //                       <Trash2 className="h-4 w-4 text-destructive" />
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </CardHeader>

// //               <CardContent>
// //                 <p className="text-foreground">{a.description}</p>
// //                 {a.link && (
// //                   <a
// //                     href={a.link}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="text-primary hover:underline text-sm mt-2 inline-block"
// //                   >
// //                     Learn more →
// //                   </a>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default Announcements;




// import { useEffect, useState } from "react";
// import { Plus, Edit, Trash2, Calendar, Loader2 } from "lucide-react";
// import Layout from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
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
// import { toast } from "sonner";

// interface Announcement {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   link?: string;
// }

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editId, setEditId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false); // <-- added loading state
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     link: "",
//   });

//   const fetchAnnouncements = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/announcements");
//       const data = await res.json();
//       setAnnouncements(data);
//     } catch {
//       toast.error("Failed to fetch announcements");
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const method = editId ? "PUT" : "POST";
//     const url = editId
//       ? `http://localhost:8000/announcements/${editId}`
//       : "http://localhost:8000/announcements";

//     try {
//       setLoading(true); // start loader
//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Request failed");

//       toast.success(editId ? "Announcement updated!" : "Announcement created!");
//       setIsDialogOpen(false);
//       setEditId(null);
//       setFormData({ title: "", description: "", link: "" });
//       fetchAnnouncements();
//     } catch {
//       toast.error("Operation failed");
//     } finally {
//       setLoading(false); // stop loader
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await fetch(`http://localhost:8000/announcements/${id}`, {
//         method: "DELETE",
//       });
//       toast.success("Deleted");
//       setAnnouncements((prev) => prev.filter((a) => a.id !== id));
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const handleEdit = (announcement: Announcement) => {
//     setEditId(announcement.id);
//     setFormData({
//       title: announcement.title,
//       description: announcement.description,
//       link: announcement.link || "",
//     });
//     setIsDialogOpen(true);
//   };

//   return (
//     <Layout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-3xl font-bold tracking-tight text-foreground">
//               Announcements
//             </h2>
//             <p className="text-muted-foreground mt-1">
//               Communicate with your students
//             </p>
//           </div>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button
//                 className="gap-2"
//                 onClick={() => {
//                   setEditId(null);
//                   setFormData({ title: "", description: "", link: "" });
//                 }}
//               >
//                 <Plus className="h-4 w-4" />
//                 New Announcement
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>
//                   {editId ? "Edit Announcement" : "Create Announcement"}
//                 </DialogTitle>
//                 <DialogDescription>
//                   {editId
//                     ? "Update announcement details"
//                     : "Share important updates with your students"}
//                 </DialogDescription>
//               </DialogHeader>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Title</Label>
//                   <Input
//                     id="title"
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                     placeholder="Announcement title"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     rows={4}
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                     placeholder="Announcement details"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="link">Link (optional)</Label>
//                   <Input
//                     id="link"
//                     type="url"
//                     value={formData.link}
//                     onChange={(e) =>
//                       setFormData({ ...formData, link: e.target.value })
//                     }
//                     placeholder="https://..."
//                   />
//                 </div>

//                 <div className="flex justify-end gap-2 pt-4">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setIsDialogOpen(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={loading} className="gap-2">
//                     {loading ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         {editId ? "Saving..." : "Publishing..."}
//                       </>
//                     ) : editId ? (
//                       "Save Changes"
//                     ) : (
//                       "Publish"
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Announcements List */}
//         <div className="grid gap-6">
//           {announcements.map((a) => (
//             <Card
//               key={a.id}
//               className="shadow-card hover:shadow-elevated transition-shadow"
//             >
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div className="space-y-1">
//                     <CardTitle>{a.title}</CardTitle>
//                     <CardDescription className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       {new Date(a.date).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     </CardDescription>
//                   </div>

//                   <div className="flex gap-2">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleEdit(a)}
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleDelete(a.id)}
//                     >
//                       <Trash2 className="h-4 w-4 text-destructive" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent>
//                 <p className="text-foreground">{a.description}</p>
//                 {a.link && (
//                   <a
//                     href={a.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-primary hover:underline text-sm mt-2 inline-block"
//                   >
//                     Learn more →
//                   </a>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Announcements;





// import { useEffect, useState } from "react";
// import { Plus, Edit, Trash2, Calendar, Loader2 } from "lucide-react";
// import Layout from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
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
// import { toast } from "sonner";

// interface Course {
//   id: number;
//   title: string;
// }

// interface Announcement {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   link?: string;
//   course_id: number;
// }

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editId, setEditId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     link: "",
//     course_id: 0,
//   });

//   // Fetch courses for dropdown
//   const fetchCourses = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/courses/");
//       const data = await res.json();
//       setCourses(data);
//     } catch {
//       toast.error("Failed to fetch courses");
//     }
//   };

//   const fetchAnnouncements = async (courseId?: number) => {
//     try {
//       const url = courseId
//         ? `http://localhost:8000/announcements?course_id=${courseId}`
//         : "http://localhost:8000/announcements";
//       const res = await fetch(url);
//       const data = await res.json();
//       setAnnouncements(data);
//     } catch {
//       toast.error("Failed to fetch announcements");
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//     fetchAnnouncements();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.course_id) {
//       toast.error("Please select a course");
//       return;
//     }

//     const method = editId ? "PUT" : "POST";
//     const url = editId
//       ? `http://localhost:8000/announcements/${editId}`
//       : "http://localhost:8000/announcements";

//     try {
//       setLoading(true);
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Request failed");

//       toast.success(editId ? "Announcement updated!" : "Announcement created!");
//       setIsDialogOpen(false);
//       setEditId(null);
//       setFormData({ title: "", description: "", link: "", course_id: 0 });
//       fetchAnnouncements(selectedCourse || undefined);
//     } catch {
//       toast.error("Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await fetch(`http://localhost:8000/announcements/${id}`, {
//         method: "DELETE",
//       });
//       toast.success("Deleted");
//       setAnnouncements((prev) => prev.filter((a) => a.id !== id));
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const handleEdit = (announcement: Announcement) => {
//     setEditId(announcement.id);
//     setFormData({
//       title: announcement.title,
//       description: announcement.description,
//       link: announcement.link || "",
//       course_id: announcement.course_id,
//     });
//     setIsDialogOpen(true);
//   };

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-3xl font-bold tracking-tight text-foreground">
//               Announcements
//             </h2>
//             <p className="text-muted-foreground mt-1">
//               Manage announcements linked to each course.
//             </p>
//           </div>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button
//                 className="gap-2"
//                 onClick={() => {
//                   setEditId(null);
//                   setFormData({ title: "", description: "", link: "", course_id: 0 });
//                 }}
//               >
//                 <Plus className="h-4 w-4" />
//                 New Announcement
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>
//                   {editId ? "Edit Announcement" : "Create Announcement"}
//                 </DialogTitle>
//                 <DialogDescription>
//                   Link announcements directly to a course
//                 </DialogDescription>
//               </DialogHeader>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Title</Label>
//                   <Input
//                     id="title"
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                     placeholder="Announcement title"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     rows={4}
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                     placeholder="Announcement details"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="link">Link (optional)</Label>
//                   <Input
//                     id="link"
//                     type="url"
//                     value={formData.link}
//                     onChange={(e) =>
//                       setFormData({ ...formData, link: e.target.value })
//                     }
//                     placeholder="https://..."
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="course">Select Course</Label>
//                   <select
//                     id="course"
//                     className="border rounded-md w-full px-3 py-2"
//                     value={formData.course_id}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         course_id: parseInt(e.target.value),
//                       })
//                     }
//                     required
//                   >
//                     <option value="">-- Select a course --</option>
//                     {courses.map((course) => (
//                       <option key={course.id} value={course.id}>
//                         {course.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="flex justify-end gap-2 pt-4">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => setIsDialogOpen(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={loading} className="gap-2">
//                     {loading ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         {editId ? "Saving..." : "Publishing..."}
//                       </>
//                     ) : editId ? (
//                       "Save Changes"
//                     ) : (
//                       "Publish"
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Course Filter */}
//         <div className="flex gap-3 items-center">
//           <select
//             className="border rounded-md px-3 py-2"
//             value={selectedCourse || ""}
//             onChange={(e) => {
//               const id = e.target.value ? parseInt(e.target.value) : null;
//               setSelectedCourse(id);
//               fetchAnnouncements(id || undefined);
//             }}
//           >
//             <option value="">All Courses</option>
//             {courses.map((course) => (
//               <option key={course.id} value={course.id}>
//                 {course.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Announcements List */}
//         <div className="grid gap-6">
//           {announcements.map((a) => (
//             <Card key={a.id} className="shadow-card hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div className="space-y-1">
//                     <CardTitle>{a.title}</CardTitle>
//                     <CardDescription className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       {new Date(a.date).toLocaleDateString()}
//                     </CardDescription>
//                   </div>

//                   <div className="flex gap-2">
//                     <Button variant="ghost" size="icon" onClick={() => handleEdit(a)}>
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}>
//                       <Trash2 className="h-4 w-4 text-destructive" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent>
//                 <p>{a.description}</p>
//                 {a.link && (
//                   <a
//                     href={a.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-primary hover:underline text-sm mt-2 inline-block"
//                   >
//                     Learn more →
//                   </a>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Announcements;







import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Calendar, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";

const API_URL = "http://127.0.0.1:8000";

interface Course {
  id: number;
  title: string;
}

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  link?: string;
  course_id: number;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    course_id: 0,
  });

  // Fetch courses for dropdown
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses/`);
      const data = await res.json();
      setCourses(data);
    } catch {
      toast.error("Failed to fetch courses");
    }
  };

  const fetchAnnouncements = async (courseId?: number) => {
    try {
      const url = courseId
        ? `${API_URL}/announcements?course_id=${courseId}`
        : `${API_URL}/announcements`;
      const res = await fetch(url);
      const data = await res.json();
      setAnnouncements(data);
    } catch {
      toast.error("Failed to fetch announcements");
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.course_id) {
      toast.error("Please select a course");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/announcements/${editId}`
      : `${API_URL}/announcements`;

    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Request failed");

      toast.success(editId ? "Announcement updated!" : "Announcement created!");
      setIsDialogOpen(false);
      setEditId(null);
      setFormData({ title: "", description: "", link: "", course_id: 0 });
      fetchAnnouncements(selectedCourse || undefined);
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/announcements/${id}`, {
        method: "DELETE",
      });
      toast.success("Deleted");
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setEditId(announcement.id);
    setFormData({
      title: announcement.title,
      description: announcement.description,
      link: announcement.link || "",
      course_id: announcement.course_id,
    });
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Announcements
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage announcements linked to each course.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="gap-2"
                onClick={() => {
                  setEditId(null);
                  setFormData({ title: "", description: "", link: "", course_id: 0 });
                }}
              >
                <Plus className="h-4 w-4" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editId ? "Edit Announcement" : "Create Announcement"}
                </DialogTitle>
                <DialogDescription>
                  Link announcements directly to a course
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Announcement title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Announcement details"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link (optional)</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Select Course</Label>
                  <select
                    id="course"
                    className="border rounded-md w-full px-3 py-2"
                    value={formData.course_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        course_id: parseInt(e.target.value),
                      })
                    }
                    required
                  >
                    <option value="">-- Select a course --</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {editId ? "Saving..." : "Publishing..."}
                      </>
                    ) : editId ? (
                      "Save Changes"
                    ) : (
                      "Publish"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Course Filter */}
        <div className="flex gap-3 items-center">
          <select
            className="border rounded-md px-3 py-2"
            value={selectedCourse || ""}
            onChange={(e) => {
              const id = e.target.value ? parseInt(e.target.value) : null;
              setSelectedCourse(id);
              fetchAnnouncements(id || undefined);
            }}
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Announcements List */}
        <div className="grid gap-6">
          {announcements.map((a) => (
            <Card key={a.id} className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{a.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(a.date).toLocaleDateString()}
                    </CardDescription>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(a)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p>{a.description}</p>
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm mt-2 inline-block"
                  >
                    Learn more →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Announcements;
