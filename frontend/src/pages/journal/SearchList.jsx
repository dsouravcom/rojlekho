import { format } from "date-fns";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api.js";

import Footer from "../common/Footer";
import NavBar from "../common/NavBar";

function SearchList() {
  const { query } = useParams();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (selectedPage) => {
    // Add your logic to handle page change here
    console.log(`Selected page: ${selectedPage}`);
  };

  useEffect(() => {
    try {
      const fetchJournal = async () => {
        const response = await api.get(`/post/search?search=${query}`);
        setPosts(response.data);
      };
      fetchJournal();
    } catch (e) {
      console.error(e);
    }
  }, [query]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        {/*  */}
        <div className="bg-slate-300 ps-4 pr-6 ">
          <div className="pt-5 pb-1 flex-row sm:flex justify-between">
            <h1 className="text-3xl font-semibold ">Your Daily Journal</h1>
          </div>
          <div className="flex justify-between">
            <div className="mt-4">Total Search result count {posts.length}</div>
            <div className="flex justify-between ps-32 pr-32">
              {/* //search box */}
              <div className="mb-4">
                <form>
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-96 p-4 ps-10 text-sm text-gray-900 border focus:outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search...."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                    <Link to={`/search/${searchQuery}`}>
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="my-7 mx-14">
          <div className="flex justify-center lg:justify-between mx-14">
            <h1 className="text-2xl font-bold mb-4">Journal Entries</h1>
            <h1 className="text-2xl font-bold mb-4 invisible lg:visible">
              Created Date
            </h1>
          </div>
          <div className="border-[1px] border-black mb-4"></div>

          <div className="container mx-auto mt-8">
            {posts.length === 0 ? (
              <p className="text-center text-2xl font-fold">
                No result found &quot;{query}&quot;
              </p>
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
                          {format(
                            new Date(post.createdAt),
                            "ccc d/M/yyyy h:m aaa"
                          )}
                        </p>
                      </div>
                      <div className="border border-gray-400 my-2"></div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            {posts.length > 0 && (
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={posts.length}
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
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchList;
