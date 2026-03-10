import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link"],
    ["clean"],
  ],
};

export default function Editor({ value, setValue }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
      <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
    </div>
  );
}