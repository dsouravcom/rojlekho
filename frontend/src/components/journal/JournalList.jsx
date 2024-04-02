import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../../firebase.js";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

const JournalList = (prop) => {
  const { sortingTime } = prop;

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_JOURNALS_URL}?uid=${
              user.uid
            }&time=${sortingTime}&page=${currentPage}`
          );
          setPosts(response.data.posts); // Take only the first pageSize notes
          setTotalPages(Math.ceil(response.data.totalPosts / 10));
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      };
      fetchData();
    });
  }, [currentPage, sortingTime]); // Fetch notes whenever currentPage changes

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber+1);
  };

  return (
    <div className="container mx-auto mt-8">
      {posts.length === 0 ? (
        <p>There are no posts available. Please create one.</p>
      ) : (
        <ul className="mx-2 lg:mx-10">
          {posts.map((post) => (
            <Link to={`/post/${post._id}`} key={post._id}>
              <li className="mb-4">
                <div className="flex flex-col justify-center lg:flex-row lg:justify-between items-center mx-2 lg:mx-6">
                  <h3 className="container text-lg font-semibold mb-2 w-1/5 lg:mb-0 lg:w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap lg:whitespace-normal transition-all ">
                    {post.title}
                  </h3>
                  <p className="text-gray-500">
                    {format(new Date(post.createdAt), "ccc d/M/yyyy h:m aaa")}
                  </p>
                </div>
                <div className="border border-gray-400 my-2"></div>
              </li>
            </Link>
          ))}
        </ul>
      )}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => handlePageChange(selected)}
        containerClassName={"pagination flex justify-center"}
        activeClassName={"font-bold text-white"}
        previousLinkClassName={
          "px-3 py-1 bg-gray-500 border border-gray-300  rounded-lg hover:bg-gray-300"
        }
        nextLinkClassName={
          "px-3 py-1 bg-gray-500 border border-gray-300 rounded-lg hover:bg-gray-300"
        }
        pageLinkClassName={
          "px-3 py-1 bg-gray-500 border border-gray-300 rounded-lg hover:bg-gray-300"
        }
        breakLinkClassName={
          "px-3 py-1 bg-gray-500 border border-gray-300 rounded-lg hover:bg-gray-300"
        }
      />
    </div>
  );
};

export default JournalList;
