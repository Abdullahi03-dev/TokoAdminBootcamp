// import { useEffect, useState } from "react";
// import Layout from "@/components/Layout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { Plus, UploadCloud, Trash2, Calendar } from "lucide-react";

// interface Course {
//   id: number;
//   title: string;
// }

// interface Certificate {
//   id: number;
//   course_name: string;
//   file_url: string;
//   uploaded_at: string;
// }

// const Certificates = () => {
//   const [certificates, setCertificates] = useState<Certificate[]>([]);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     fetchCourses();
//     fetchCertificates();
//   }, []);

//   const fetchCourses = async () => {
//     const res = await fetch("http://localhost:8000/certificates/courses");
//     const data = await res.json();
//     setCourses(data);
//   };

//   const fetchCertificates = async () => {
//     const res = await fetch("http://localhost:8000/certificates");
//     const data = await res.json();
//     setCertificates(data);
//   };

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file || !selectedCourse) {
//       toast.error("Please select a course and upload a file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("course_id", selectedCourse.toString());
//     formData.append("file", file);

//     try {
//       const res = await fetch("http://localhost:8000/certificates/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Upload failed");
//       toast.success("Certificate uploaded!");
//       setIsDialogOpen(false);
//       setFile(null);
//       setSelectedCourse(null);
//       fetchCertificates();
//     } catch {
//       toast.error("Failed to upload certificate");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     toast.info("Delete functionality coming soon!");
//   };

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-3xl font-bold">Certificates</h2>
//             <p className="text-muted-foreground">Upload and manage your course certificates</p>
//           </div>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Button className="gap-2">
//                 <Plus className="h-4 w-4" />
//                 Upload Certificate
//               </Button>
//             </DialogTrigger>

//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Upload Certificate</DialogTitle>
//                 <DialogDescription>Select a course and upload a certificate file</DialogDescription>
//               </DialogHeader>

//               <form onSubmit={handleUpload} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Course</Label>
//                   <select
//                     className="border rounded-md w-full p-2"
//                     onChange={(e) => setSelectedCourse(Number(e.target.value))}
//                     required
//                   >
//                     <option value="">Select a course</option>
//                     {courses.map((course) => (
//                       <option key={course.id} value={course.id}>
//                         {course.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Certificate File</Label>
//                   <input
//                     type="file"
//                     accept=".pdf,.jpg,.png"
//                     onChange={(e) => setFile(e.target.files?.[0] || null)}
//                     className="border w-full p-2 rounded-md"
//                     required
//                   />
//                 </div>

//                 <div className="flex justify-end gap-2 pt-4">
//                   <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button type="submit" className="gap-2">
//                     <UploadCloud className="h-4 w-4" />
//                     Upload
//                   </Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Certificates List */}
//         <div className="grid gap-6">
//           {certificates.map((cert) => (
//             <Card key={cert.id} className="shadow hover:shadow-lg transition-all">
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <CardTitle>{cert.course_name}</CardTitle>
//                     <CardDescription className="flex items-center gap-2 text-sm">
//                       <Calendar className="h-4 w-4" />
//                       {new Date(cert.uploaded_at).toLocaleDateString()}
//                     </CardDescription>
//                   </div>
//                   <Button variant="ghost" size="icon" onClick={() => handleDelete(cert.id)}>
//                     <Trash2 className="h-4 w-4 text-destructive" />
//                   </Button>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <a
//                   href={cert.file_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-primary hover:underline"
//                 >
//                   View Certificate
//                 </a>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Certificates;









import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, UploadCloud, Trash2, Calendar } from "lucide-react";

interface Course {
  id: number;
  title: string;
}

interface Certificate {
  id: number;
  course_name: string;
  file_url: string;
  uploaded_at: string;
}

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCourses();
    fetchCertificates();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:8000/certificates/courses");
    const data = await res.json();
    setCourses(data);
  };

  const fetchCertificates = async () => {
    const res = await fetch("http://localhost:8000/certificates");
    const data = await res.json();
    setCertificates(data);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !selectedCourse) {
      toast.error("Please select a course and upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("course_id", selectedCourse.toString());
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/certificates/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      toast.success("Certificate uploaded!");
      setIsDialogOpen(false);
      setFile(null);
      setSelectedCourse(null);
      fetchCertificates();
    } catch {
      toast.error("Failed to upload certificate");
    }
  };

  const handleDelete = async (id: number) => {
    toast.info("Delete functionality coming soon!");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Certificates</h2>
            <p className="text-muted-foreground">Upload and manage your course certificates</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Upload Certificate
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Certificate</DialogTitle>
                <DialogDescription>Select a course and upload a certificate file</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label>Course</Label>
                  <select
                    className="border rounded-md w-full p-2"
                    onChange={(e) => setSelectedCourse(Number(e.target.value))}
                    required
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Certificate File</Label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="border w-full p-2 rounded-md"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2">
                    <UploadCloud className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Certificates List */}
        <div className="grid gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="shadow hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{cert.course_name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(cert.uploaded_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cert.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={cert.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Certificate
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Certificates;