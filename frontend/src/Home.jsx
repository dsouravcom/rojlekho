import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase.js";
import axios from "axios";
import NavBar from "./components/common/NavBar";
// importing assets
import add_icon from "./assets/add.png";
import JournalList from "./components/journal/JournalList.jsx";
import Footer from "./components/common/Footer.jsx";

function Home() {
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
    const fetchData = async () => {
      try{
      const response = await axios.get(`${import.meta.env.VITE_APP_JOURNAL_COUNT_URL}?uid=${user.uid}`);
      setPostCount(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    }
  )},[]);


  
  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        <div className="bg-slate-300 ps-4 pr-6 ">
          <div className="pt-5 pb-1 flex justify-between">
            <h1 className="text-3xl font-semibold ">Your Daily Journal</h1>
            <div className="bg-slate-500 p-2 rounded-md ps-2 pt-[6px]">
              <Link to="/create">
                <button className="text-white flex ">
                  <img
                    src={add_icon}
                    alt="Create New"
                    className="w-6 h-6 p-[2px] mt-[1px]"
                  />
                  <span className="font-semibold">Create New</span>
                </button>
              </Link>
            </div>
          </div>

          <div>
            <p>Total Entry {postCount}</p>
          </div>

          <div className="flex justify-between ps-32 pr-32">
            <div className="flex">
              <div className="flex p-5 flex-col ">
                <label className="font-semibold ">SHORT</label>
                <select className="text-sm rounded-md p-1 w-32">
                  <option>created time &#x2B06;</option>
                  <option>modified time &#x2B07;</option>
                </select>
              </div>

              <div className="flex p-5 flex-col ">
                <label className="font-semibold ">SINCE</label>
                <select className="text-sm rounded-md p-1 w-32">
                  <option>this week</option>
                  <option>this month</option>
                  <option>Last 6 month</option>
                  <option>Last 12 month</option>
                  <option>all time</option>
                </select>
              </div>
            </div>

            {/* //search box */}
            <div className="pt-6">
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
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search...."
                    required
                  />
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
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* journal list */}
        <div className="my-7 mx-14">
          <div className="flex justify-between mx-14">
            <h1 className="text-2xl font-bold mb-4">Journal Entries</h1>
            <h1 className="text-2xl font-bold mb-4">Created Date</h1>
          </div>
          <div className="border-[1px] border-black mb-4"></div>
          <JournalList />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
