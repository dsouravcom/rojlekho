import { useState, useEffect, useContext } from "react";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

import NavBar from "../common/NavBar";
import Footer from "../common/Footer";

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
    ["link", ],
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

const NewJournal = () => {
  const [preTitle, setPreTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleLength, setTitleLength] = useState(0);

  const Navigate = useNavigate();
  const { loading } = useContext(UserContext);

  const handleChangeTitle = (e) => {
    const newTitle = e.target.value;
    setPreTitle(newTitle);
  };

  useEffect(() => {
    setTitleLength(preTitle.length);
  }, [preTitle]);

  // const isSubmitDisabled = titleLength > 75 || !content;
  const title = titleLength === 0 ? "Untitled" : preTitle;

  const handleSubmit = async () => {

    if(titleLength > 75){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Title should not exceed 75 characters",
      
      })
      return;
    }

    if(content.length === 0){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Content should not be empty",
      
      })
      return;
    }
    
    try {
      await api.post("/post/create",
        { title, content }
      );
        Navigate("/");
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
          title: "Created successfully",
        });
      
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again after some time.",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            placeholder="Title"
            value={preTitle}
            onChange={handleChangeTitle}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
            style={{ borderColor: titleLength > 75 ? 'red' : 'inherit' }}
            required
          />

          <label htmlFor="content" className="text-lg font-medium mb-2 block">
            Content <span className="text-red-600 ">*</span>
          </label>
          <ReactQuill
            theme="snow"
            id="content"
            placeholder="Content"
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
};

export default NewJournal;
