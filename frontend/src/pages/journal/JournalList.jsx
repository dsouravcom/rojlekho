
import { useEffect, useState, useContext} from "react";
import PropTypes from 'prop-types';
import api from "../../api/api";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const JournalList = ({ sortingTime }) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading } = useContext(UserContext);
  
  const fetchPosts = async (page = 1) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get('/post/posts', {
        params: {
          page,
          sortBy: sortingTime,
          limit: 10
        }
      });

      setPosts(response.data.data.posts);
      setPagination({
        currentPage: page,
        totalPages: response.data.data.pagination.totalPages,
      });
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1; // selected is zero-based, so we add 1
    fetchPosts(newPage);
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  
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
      {posts.length > 0 && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pagination.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
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
          forcePage={pagination.currentPage - 1} // forcePage is zero-based
        />
      )}
    </div>
  );
};

JournalList.propTypes = {
  sortingTime: PropTypes.string.isRequired,
};

export default JournalList;
