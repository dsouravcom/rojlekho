import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../../firebase.js'



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
    const user = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    navigate('/');
    }
    catch(error){
      console.log(error);
    }
  };

  //verify if user is logged in
  useEffect(() => {
    const ifUser = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/'); // Redirect to home page if user is already logged in
      }
    });

    return ifUser; // Cleanup function to remove the listener
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className='flex justify-center'>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-indigo-600"
          >
            Log in
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
