


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Plus, Edit, Trash2, X } from "lucide-react";
// import Layout from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";

// interface SubModule {
//   id: string;
//   title: string;
//   link: string;
// }

// interface Module {
//   id: string;
//   day: number;
//   submodules: SubModule[];
// }

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   type: "free" | "paid";
//   price?: string;
//   image?: string;
//   modules?: Module[];
// }

// const API_URL = "http://127.0.0.1:8000"; // Your FastAPI backend

// const Courses = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingCourse, setEditingCourse] = useState<Course | null>(null);
//   const [modules, setModules] = useState<Module[]>([
//     { id: "1", day: 1, submodules: [{ id: "1", title: "", link: "" }] },
//   ]);

//   const [courseForm, setCourseForm] = useState({
//     title: "",
//     description: "",
//     duration: "",
//     type: "free",
//     price: "",
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 🔹 Fetch all courses
//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/courses`);
//       setCourses(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch courses");
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // 🔹 Handle Add or Update
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();

//       formData.append("title", courseForm.title);
//       formData.append("description", courseForm.description);
//       formData.append("duration", courseForm.duration);
//       formData.append("type", courseForm.type);
//       if (courseForm.type === "paid" && courseForm.price) {
//         formData.append("price", courseForm.price);
//       }

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       // Attach modules as JSON string
//       const modulesPayload = modules.map((m) => ({
//         day: m.day,
//         submodules: m.submodules.map((s) => ({
//           title: s.title,
//           link: s.link,
//         })),
//       }));
//       formData.append("modules", JSON.stringify(modulesPayload));

//       if (editingCourse) {
//         await axios.put(`${API_URL}/courses/${editingCourse.id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Course updated successfully");
//       } else {
//         await axios.post(`${API_URL}/courses`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Course created successfully");
//       }

//       handleDialogClose();
//       fetchCourses();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save course");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // 🔹 Delete course
//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`${API_URL}/courses/${id}`);
//       setCourses(courses.filter((c) => c.id !== id));
//       toast.success("Course deleted successfully");
//     } catch {
//       toast.error("Failed to delete course");
//     }
//   };

//   // 🔹 Edit course
//   const handleEdit = (course: Course) => {
//     setEditingCourse(course);
//     setCourseForm({
//       title: course.title,
//       description: course.description,
//       duration: course.duration.toString(),
//       type: course.type,
//       price: course.price || "",
//     });
//     setModules(
//       course.modules || [{ id: "1", day: 1, submodules: [{ id: "1", title: "", link: "" }] }]
//     );
//     setIsDialogOpen(true);
//   };

//   // 🔹 Add / Remove Modules
//   const addModule = () => {
//     const newDay = modules.length + 1;
//     setModules([
//       ...modules,
//       {
//         id: Date.now().toString(),
//         day: newDay,
//         submodules: [{ id: Date.now().toString(), title: "", link: "" }],
//       },
//     ]);
//   };

//   const addSubModule = (moduleId: string) => {
//     setModules(
//       modules.map((m) =>
//         m.id === moduleId
//           ? {
//               ...m,
//               submodules: [
//                 ...m.submodules,
//                 { id: Date.now().toString(), title: "", link: "" },
//               ],
//             }
//           : m
//       )
//     );
//   };

//   const removeModule = (moduleId: string) => {
//     const updatedModules = modules.filter((m) => m.id !== moduleId);
//     const reindexed = updatedModules.map((m, idx) => ({ ...m, day: idx + 1 }));
//     setModules(reindexed);
//   };

//   const removeSubModule = (moduleId: string, subId: string) => {
//     setModules(
//       modules.map((m) =>
//         m.id === moduleId
//           ? { ...m, submodules: m.submodules.filter((s) => s.id !== subId) }
//           : m
//       )
//     );
//   };

//   const handleDialogClose = () => {
//     setIsDialogOpen(false);
//     setEditingCourse(null);
//     setModules([{ id: "1", day: 1, submodules: [{ id: "1", title: "", link: "" }] }]);
//     setCourseForm({
//       title: "",
//       description: "",
//       duration: "",
//       type: "free",
//       price: "",
//     });
//     setImageFile(null);
//     setIsSubmitting(false);
//   };

//   const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setCourseForm({ ...courseForm, [e.target.id]: e.target.value });
//   };

//   return (
//     <Layout>
//       <div className="space-y-6">
//         {/* Header Section */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-3xl font-bold tracking-tight text-foreground">Manage Courses</h2>
//             <p className="text-muted-foreground mt-1">
//               Create and manage your bootcamp courses
//             </p>
//           </div>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button className="gap-2">
//                 <Plus className="h-4 w-4" />
//                 Add Course
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//               <DialogHeader>
//                 <DialogTitle>
//                   {editingCourse ? "Edit Course" : "Create New Course"}
//                 </DialogTitle>
//                 <DialogDescription>
//                   {editingCourse ? "Update course details" : "Add a new course"}
//                 </DialogDescription>
//               </DialogHeader>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Image Upload */}
//                 <div className="space-y-2">
//                   <Label htmlFor="image">Course Image</Label>
//                   <Input
//                     id="image"
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setImageFile(e.target.files ? e.target.files[0] : null)
//                     }
//                   />
//                 </div>

//                 {/* Course Info */}
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Course Title</Label>
//                   <Input id="title" value={courseForm.title} onChange={handleCourseChange} required />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Short Description</Label>
//                   <Textarea id="description" value={courseForm.description} onChange={handleCourseChange} required />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="duration">Duration (days)</Label>
//                     <Input id="duration" type="number" value={courseForm.duration} onChange={handleCourseChange} required />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="type">Course Type</Label>
//                     <Select
//                       value={courseForm.type}
//                       onValueChange={(val) => setCourseForm({ ...courseForm, type: val })}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="free">Free</SelectItem>
//                         <SelectItem value="paid">Paid</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 {courseForm.type === "paid" && (
//                   <div className="space-y-2">
//                     <Label htmlFor="price">Price</Label>
//                     <Input id="price" value={courseForm.price} onChange={handleCourseChange} placeholder="e.g. 5000" />
//                   </div>
//                 )}

//                 {/* Modules */}
//                 <div className="space-y-2">
//                   <Label>Course Modules</Label>
//                   <div className="space-y-4">
//                     {modules.map((module) => (
//                       <Card key={module.id}>
//                         <CardContent className="pt-6 space-y-4">
//                           <div className="flex items-center justify-between">
//                             <Label className="text-lg font-semibold">Day {module.day}</Label>
//                             {modules.length > 1 && (
//                               <Button type="button" variant="ghost" size="icon" onClick={() => removeModule(module.id)}>
//                                 <X className="h-4 w-4" />
//                               </Button>
//                             )}
//                           </div>

//                           {module.submodules.map((sub, idx) => (
//                             <div key={sub.id} className="space-y-2 p-3 border rounded-md">
//                               <div className="flex items-center justify-between">
//                                 <Label>Lesson {idx + 1}</Label>
//                                 {module.submodules.length > 1 && (
//                                   <Button
//                                     type="button"
//                                     variant="ghost"
//                                     size="icon"
//                                     onClick={() => removeSubModule(module.id, sub.id)}
//                                   >
//                                     <X className="h-3 w-3" />
//                                   </Button>
//                                 )}
//                               </div>

//                               <Input
//                                 placeholder="Lesson title"
//                                 value={sub.title}
//                                 onChange={(e) =>
//                                   setModules(
//                                     modules.map((m) =>
//                                       m.id === module.id
//                                         ? {
//                                             ...m,
//                                             submodules: m.submodules.map((s) =>
//                                               s.id === sub.id ? { ...s, title: e.target.value } : s
//                                             ),
//                                           }
//                                         : m
//                                     )
//                                   )
//                                 }
//                               />
//                               <Input
//                                 placeholder="Video/Meet Link"
//                                 value={sub.link}
//                                 onChange={(e) =>
//                                   setModules(
//                                     modules.map((m) =>
//                                       m.id === module.id
//                                         ? {
//                                             ...m,
//                                             submodules: m.submodules.map((s) =>
//                                               s.id === sub.id ? { ...s, link: e.target.value } : s
//                                             ),
//                                           }
//                                         : m
//                                     )
//                                   )
//                                 }
//                               />
//                             </div>
//                           ))}

//                           <Button type="button" variant="outline" size="sm" onClick={() => addSubModule(module.id)}>
//                             <Plus className="h-4 w-4 mr-1" />
//                             Add Lesson to Day {module.day}
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>

//                   <Button type="button" variant="outline" size="sm" onClick={addModule}>
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Day {modules.length + 1}
//                   </Button>
//                 </div>

//                 <div className="flex justify-end gap-2 pt-4">
//                   <Button type="button" variant="outline" onClick={handleDialogClose}>
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={isSubmitting}>
//                     {isSubmitting ? (
//                       <div className="flex items-center gap-2">
//                         <svg
//                           className="animate-spin h-4 w-4 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3-3 3h4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8h4l-3-3 3-3H4z"
//                           ></path>
//                         </svg>
//                         {editingCourse ? "Updating..." : "Creating..."}
//                       </div>
//                     ) : (
//                       <>{editingCourse ? "Update Course" : "Create Course"}</>
//                     )}
//                   </Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Courses Table */}
//         <Card className="shadow-card">
//           <CardHeader>
//             <CardTitle>All Courses</CardTitle>
//             <CardDescription>Manage your course catalog</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Image</TableHead>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Duration</TableHead>
//                   <TableHead>Price</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {courses.map((course) => (
//                   <TableRow key={course.id}>
//                     <TableCell>
//                       {course.image ? (
//                         <img src={`${API_URL}/${course.image}`} alt="Course" className="h-10 w-10 object-cover rounded-md" />
//                       ) : (
//                         "—"
//                       )}
//                     </TableCell>
//                     <TableCell>{course.title}</TableCell>
//                     <TableCell>
//                       <Badge variant={course.type === "paid" ? "default" : "secondary"}>{course.type}</Badge>
//                     </TableCell>
//                     <TableCell>{course.duration} days</TableCell>
//                     <TableCell>{course.price || "—"}</TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex justify-end gap-2">
//                         <Button variant="ghost" size="icon" onClick={() => handleEdit(course)}>
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
//                           <Trash2 className="h-4 w-4 text-destructive" />
//                         </Button>
//                       </div>
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

// export default Courses;





import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface SubModule {
  id: string;
  title: string;
  content: string;
  link: string;
  type?: "text" | "link";
}

interface Module {
  id: string;
  day: number;
  submodules: SubModule[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: "free" | "paid";
  price?: string;
  image?: string;
  modules?: Module[];
}

const API_URL = "http://127.0.0.1:8000";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      day: 1,
      submodules: [
        { id: "1", title: "", content: "", link: "", type: "link" },
      ],
    },
  ]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    duration: "",
    type: "free",
    price: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_URL}/courses`);
      setCourses(res.data);
    } catch {
      toast.error("Failed to fetch courses");
    }
  };

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCourseForm({ ...courseForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", courseForm.title);
      formData.append("description", courseForm.description);
      formData.append("duration", courseForm.duration);
      formData.append("type", courseForm.type);
      if (courseForm.type === "paid" && courseForm.price)
        formData.append("price", courseForm.price);
      if (imageFile) formData.append("image", imageFile);

      // Prepare modules data for backend
      const modulesPayload = modules.map((m) => ({
        day: m.day,
        submodules: m.submodules.map((s) => ({
          title: s.title,
          link: s.link,
          content: s.type === "text" ? s.content : "",
          type: s.type,
        })),
      }));
      formData.append("modules", JSON.stringify(modulesPayload));

      if (editingCourse) {
        await axios.put(`${API_URL}/courses/${editingCourse.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Course updated successfully");
      } else {
        await axios.post(`${API_URL}/courses`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Course created successfully");
      }

      handleDialogClose();
      fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save course");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/courses/${id}`);
      setCourses(courses.filter((c) => c.id !== id));
      toast.success("Course deleted successfully");
    } catch {
      toast.error("Failed to delete course");
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      duration: course.duration.toString(),
      type: course.type,
      price: course.price || "",
    });
    setModules(
      course.modules || [
        {
          id: "1",
          day: 1,
          submodules: [{ id: "1", title: "", content: "", link: "", type: "link" }],
        },
      ]
    );
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingCourse(null);
    setModules([
      {
        id: "1",
        day: 1,
        submodules: [{ id: "1", title: "", content: "", link: "", type: "link" }],
      },
    ]);
    setCourseForm({ title: "", description: "", duration: "", type: "free", price: "" });
    setImageFile(null);
    setIsSubmitting(false);
  };

  const addModule = () => {
    const newDay = modules.length + 1;
    setModules([
      ...modules,
      {
        id: Date.now().toString(),
        day: newDay,
        submodules: [
          { id: Date.now().toString(), title: "", content: "", link: "", type: "link" },
        ],
      },
    ]);
  };

  const addSubModule = (moduleId: string) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              submodules: [
                ...m.submodules,
                { id: Date.now().toString(), title: "", content: "", link: "", type: "link" },
              ],
            }
          : m
      )
    );
  };

  const removeModule = (moduleId: string) =>
    setModules(
      modules
        .filter((m) => m.id !== moduleId)
        .map((m, idx) => ({ ...m, day: idx + 1 }))
    );

  const removeSubModule = (moduleId: string, subId: string) =>
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? { ...m, submodules: m.submodules.filter((s) => s.id !== subId) }
          : m
      )
    );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Manage Courses
            </h2>
            <p className="text-muted-foreground mt-1">
              Create and manage your bootcamp courses
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Add Course
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCourse ? "Edit Course" : "Create New Course"}
                </DialogTitle>
                <DialogDescription>
                  {editingCourse ? "Update course details" : "Add a new course"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Course Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </div>

                {/* Basic Course Details */}
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={courseForm.title}
                    onChange={handleCourseChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={courseForm.description}
                    onChange={handleCourseChange}
                    required
                  />
                </div>

                {/* Duration & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={courseForm.duration}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Course Type</Label>
                    <Select
                      value={courseForm.type}
                      onValueChange={(val) =>
                        setCourseForm({ ...courseForm, type: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {courseForm.type === "paid" && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={courseForm.price}
                      onChange={handleCourseChange}
                      placeholder="e.g. 5000"
                    />
                  </div>
                )}

                {/* Modules Section */}
                <div className="space-y-2">
                  <Label>Course Modules</Label>
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <Card key={module.id}>
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-lg font-semibold">
                              Day {module.day}
                            </Label>
                            {modules.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeModule(module.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          {module.submodules.map((sub, idx) => (
                            <div
                              key={sub.id}
                              className="space-y-2 p-3 border rounded-md"
                            >
                              <div className="flex items-center justify-between">
                                <Label>Lesson {idx + 1}</Label>
                                {module.submodules.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      removeSubModule(module.id, sub.id)
                                    }
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>

                              {/* Lesson Title */}
                              <Input
                                placeholder="Lesson Title"
                                value={sub.title}
                                onChange={(e) =>
                                  setModules(
                                    modules.map((m) =>
                                      m.id === module.id
                                        ? {
                                            ...m,
                                            submodules: m.submodules.map((s) =>
                                              s.id === sub.id
                                                ? { ...s, title: e.target.value }
                                                : s
                                            ),
                                          }
                                        : m
                                    )
                                  )
                                }
                              />

                              {/* Type Selector */}
                              <Select
                                value={sub.type}
                                onValueChange={(val: "text" | "link") =>
                                  setModules(
                                    modules.map((m) =>
                                      m.id === module.id
                                        ? {
                                            ...m,
                                            submodules: m.submodules.map((s) =>
                                              s.id === sub.id
                                                ? { ...s, type: val }
                                                : s
                                            ),
                                          }
                                        : m
                                    )
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Lesson Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Text</SelectItem>
                                  <SelectItem value="link">Link</SelectItem>
                                </SelectContent>
                              </Select>

                              {/* Rich Text or Link */}
                              {sub.type === "link" ? (
                                <Input
                                  placeholder="Video or external link"
                                  value={sub.link}
                                  onChange={(e) =>
                                    setModules(
                                      modules.map((m) =>
                                        m.id === module.id
                                          ? {
                                              ...m,
                                              submodules: m.submodules.map(
                                                (s) =>
                                                  s.id === sub.id
                                                    ? {
                                                        ...s,
                                                        link: e.target.value,
                                                      }
                                                    : s
                                              ),
                                            }
                                          : m
                                      )
                                    )
                                  }
                                />
                              ) : (
                                <ReactQuill
                                  theme="snow"
                                  value={sub.content}
                                  onChange={(value) =>
                                    setModules(
                                      modules.map((m) =>
                                        m.id === module.id
                                          ? {
                                              ...m,
                                              submodules: m.submodules.map(
                                                (s) =>
                                                  s.id === sub.id
                                                    ? { ...s, content: value }
                                                    : s
                                              ),
                                            }
                                          : m
                                      )
                                    )
                                  }
                                />
                              )}
                            </div>
                          ))}

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addSubModule(module.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Lesson to Day{" "}
                            {module.day}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addModule}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Day {modules.length + 1}
                  </Button>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDialogClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? "Saving..."
                      : editingCourse
                      ? "Update Course"
                      : "Create Course"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table of Courses */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>All Courses</CardTitle>
            <CardDescription>Manage your course catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      {course.image ? (
                        <img
                          src={`${API_URL}/${course.image}`}
                          alt="Course"
                          className="h-10 w-10 object-cover rounded-md"
                        />
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          course.type === "paid" ? "default" : "secondary"
                        }
                      >
                        {course.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.duration} days</TableCell>
                    <TableCell>{course.price || "—"}</TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(course)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(course.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
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

export default Courses;
