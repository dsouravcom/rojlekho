import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import NavBar from '../common/NavBar'
import Footer from '../common/Footer'


const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image',
];



const NewJournal = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const data = new FormData();
  data.title = title;
  data.content = content;

  const handleSubmit = () => {
    // Implement your logic to save the journal entry
    console.log(data);
    // Add your API call or data-saving logic here
  };


  return (
    <>
    <NavBar />
    <div className="container mx-auto mt-8 min-h-screen">
      <div className=" flex flex-col mx-auto ">

        <label htmlFor="title" className="text-lg font-medium mb-2 block">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 mb-4"
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
        />

        <div className='flex justify-center'>
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

export default NewJournal