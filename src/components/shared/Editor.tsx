"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";

interface Props {
  values?: string;
  onChange: (values: string) => void;
}

const Editor = ({ values, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-disc pl-[30px]",
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-decimal pl-[30px]",
          },
        },
        heading: {
          levels: [1],
          HTMLAttributes: {
            class: "text-2xl ",
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-[250px] border border-border p-1 rounded-sm",
      },
    },
    content: values,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch gap-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
