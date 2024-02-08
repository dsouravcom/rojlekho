import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2'

import NavBar from '../common/NavBar'
import Footer from '../common/Footer'

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link',],
      ['clean']
    ],
};
  
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link',
];




function EditJournal() {
    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleLength, setTitleLength] = useState(0);

    const Navigate = useNavigate();

    useEffect(() => {
        const fetchJournal = async () => {
            const res = await axios.get(`${import.meta.env.VITE_APP_SINGLE_JOURNAL_URL}?id=${id}`);
            setTitle(res.data.title);
            setContent(res.data.content);
        }
        fetchJournal();
    }, []);

    useEffect(() => {
      setTitleLength(title.length);
    }, [title]);

    const isSubmitDisabled = titleLength > 75 || titleLength === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const res = await axios.put(`${import.meta.env.VITE_APP_UPDATE_JOURNAL_URL}`, {
            id,
            title,
            content
        });
        if(res.status === 200){
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
              }
            });
            Toast.fire({
              icon: "success",
              title: "Updated successfully"
            });
        }
    }
    catch(err){
        console.log(err);
      };
    }






  return (
    <>
    <NavBar />
    <div className="container mx-auto mt-8 min-h-screen">
      <div className=" flex flex-col mx-auto ">
        <div className='flex justify-between'>
        <label htmlFor="title" className="text-lg font-medium mb-2 block">
          Title
        </label>
        <p className="text-gray-500 mb-4">{titleLength}/75</p>
        </div>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
          style={{ borderColor: titleLength > 75 ? 'red' : 'inherit' }}
        />

        <label htmlFor="content" className="text-lg font-medium mb-2 block">
          Content
        </label>
        <ReactQuill
          theme="snow"
          id = "content"
          value={content}
          modules={modules}
          formats={formats}
          onChange={(value) => setContent(value)}
          className="mb-16 h-96"
          required
        />

        <div className='flex justify-center mt-4 sm:mt-0'>
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
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

export default EditJournal