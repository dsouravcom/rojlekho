import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {createUserWithEmailAndPassword, sendEmailVerification ,updateProfile} from 'firebase/auth';
import { auth } from '../../../firebase.js'


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const userData = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {displayName: name})
      await sendEmailVerification(auth.currentUser);
      console.log('User created and logged in successfully!');
      navigate('/');
  }
  catch(error){ 
    console.log(error);
    setError(error.code);
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
        {/* alert message */}
        <div
          className="flex items-center p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
          style={error==="auth/email-already-in-use" ? { display: "flex" } : { display: "none" }}
        >
          <svg
            className="flex-shrink-0 inline h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">alert!</span> email already in use
          </div>
        </div>
        {/*  */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className='flex justify-center'>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-indigo-600"
          >
            Sign up
          </button>
            </div>
            <div>
            <p className="text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-500 hover:underline">
                Log in
              </Link>
            </p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
