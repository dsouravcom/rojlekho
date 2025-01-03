import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/api";

import Footer from "../common/Footer";
import NavBar from "../common/NavBar";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

function EditJournal() {
  const { id } = useParams();

  const [preTitle, setPreTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleLength, setTitleLength] = useState(0);

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchJournal = async () => {
      const res = await api.get(`/post/post/${id}`);
      setPreTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchJournal();
  }, []);

  useEffect(() => {
    setTitleLength(preTitle.length);
  }, [preTitle]);

  const title = titleLength === 0 ? "Untitled" : preTitle;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titleLength > 75) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Title should be less than 75 characters!",
      });
      return;
    }

    try {
      const res = await api.put(`/post/update/${id}`, {
        title,
        content,
      });
      if (res.status === 200) {
        Navigate(`/post/${id}`);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Updated successfully",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-8 min-h-screen">
        <div className=" flex flex-col mx-auto ">
          <div className="flex justify-between">
            <label htmlFor="title" className="text-lg font-medium mb-2 block">
              Title
            </label>
            <p className="text-gray-500 mb-4">{titleLength}/75</p>
          </div>
          <input
            type="text"
            id="title"
            value={preTitle}
            onChange={(e) => setPreTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
            style={{ borderColor: titleLength > 75 ? "red" : "inherit" }}
          />

          <label htmlFor="content" className="text-lg font-medium mb-2 block">
            Content <span className="text-red-600 ">*</span>
          </label>
          <ReactQuill
            theme="snow"
            id="content"
            value={content}
            modules={modules}
            formats={formats}
            onChange={(value) => setContent(value)}
            className="mb-16 h-96"
            required
          />

          <div className="flex justify-center mt-4 sm:mt-0">
            <button
              onClick={handleSubmit}
              className="max-w-min px-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditJournal;
