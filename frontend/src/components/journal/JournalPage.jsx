import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";

import NavBar from "../common/NavBar";
import Footer from "../common/Footer";

function JournalPage() {
  const [postDocumet, setPostDocument] = useState(null);
  const { id } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchPostDocument = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SINGLE_JOURNAL_URL}?id=${id}`
        );
        const data = response.data;
        setPostDocument(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPostDocument();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_APP_DELETE_JOURNAL_URL}?id=${id}`
          );
          if (response.status === 200) {
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
              }
            });
            Toast.fire({
              icon: "success",
              title: "Deleted successfully"
            });
          }
        } catch (err) {
          console.error("ERROR IS bad" + err);
        }
      }
    });
  };

  // if (!postDocumet) return "No post found";

  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        <div className="container mx-auto">
          {postDocumet ? (
            <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-4 break-words">{postDocumet.title}</h2>
              <p className="text-gray-500 mb-4">
                {format(
                  new Date(postDocumet.createdAt),
                  "ccc d/M/yyyy h:m aaa"
                )}
              </p>
              <div
                className="text-lg overflow-hidden whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: postDocumet.content }}
              />

              <div className="mt-6 flex space-x-4">
                <Link
                  to={`/edit/${postDocumet._id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default JournalPage;
