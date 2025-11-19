"use client";

import React, { useEffect, useMemo, useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({
  onContentChange,
  defaultValue,
  name,
}: {
  onContentChange: (name: string, value: string) => void;
  defaultValue: string;
  name: string;
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [3, 4, 5, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  return (
    <QuillEditor
      theme="snow"
      value={value}
      modules={modules}
      onChange={(e: any) => {
        setValue(e);
        onContentChange(name, e);
      }}
      className="mt-2"
      style={{ borderColor: "#E5E7EB" }}
    />
  );
};

export default RichTextEditor;
