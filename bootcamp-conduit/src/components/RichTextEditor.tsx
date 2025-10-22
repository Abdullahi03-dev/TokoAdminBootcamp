// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";

// interface RichTextEditorProps {
//   content: string;
//   onChange: (value: string) => void;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
//   const editor = useEditor({
//     extensions: [StarterKit, Link],
//     content,
//     onUpdate: ({ editor }) => onChange(editor.getHTML()),
//   });

//   return <EditorContent editor={editor} className="border rounded-md p-2 min-h-[80px]" />;
// };

// export default RichTextEditor;
