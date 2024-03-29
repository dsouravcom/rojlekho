import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {auth} from '../../../firebase.js';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'


const JournalList = (prop) => {
  const {sortingTime, limit} = prop;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {

    const fetchData = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_APP_JOURNALS_URL}?uid=${user.uid}&time=${sortingTime}&limit=${limit}`)
        const allPosts = response.data;
        setPosts(allPosts);
      } catch (err) {
        console.error(err);
        setError("Error fetching data. Try again later.");
      }
      finally{
        setLoading(false);
      }
    };
    fetchData();
  }
)}, [sortingTime, limit]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <div className="my-7 mx-4 lg:mx-14">
    {posts.length === 0 ? (
          <p>There are no posts available. Please create one.</p>
        ) : (
      <ul className='mx-2 lg:mx-10'>
        {posts.map(post => (
          <Link to={`/post/${post._id}`} key={post._id}>
          <li className="mb-4">
            <div className='flex flex-col justify-center lg:flex-row lg:justify-between items-center mx-2 lg:mx-6'>
            <h3 className="container text-lg font-semibold mb-2 w-1/5 lg:mb-0 lg:w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap lg:whitespace-normal transition-all ">{post.title}</h3>
            <p className="text-gray-500">{format(new Date(post.createdAt), 'ccc d/M/yyyy h:m aaa')}</p>
            </div>
            <div className='border border-gray-400 my-2'></div>
          </li>
          </Link>
          ))}
      </ul>
      )}
    </div>
    
    </>
  );
};

export default JournalList;
