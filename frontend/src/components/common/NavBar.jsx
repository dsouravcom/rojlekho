import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {signOut} from 'firebase/auth';
import { auth } from '../../../firebase.js';
import Home_img from '../../assets/home-icon.svg';
import Logo from '../../assets/logo.png';




const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState('');
  // const { account } = useContext(AuthContext);

  useEffect(() => {
    auth.onAuthStateChanged((data) => {
      setUser(data);
    })
  }, []);




  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  // fuction for sign out
  const onClickSignOut=() => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("sign out successful");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
    window.location.reload();
  }

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to ='/'>
          <img src= {Home_img} alt="Home"  />
        </Link>
      </div>
      <div className="flex items-center">
        
          <img src= {Logo} alt="logo" className='w-48' />
        
      </div>
      <div className="flex items-center">
        <Link to ="/create">
        <button className="text-white mr-8 flex ">
          <img
            src="https://png.pngtree.com/element_our/md/20180516/md_5afbe35ff3ec9.jpg"
            alt="Create New"
            className="w-6 h-6"
          />
          <span className="ml-2">Create New</span>
        </button>
        </Link>
        <div className="relative">
          <button
            className="text-white flex items-center focus:outline-none"
            onClick={toggleProfile}
          >
            <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="Create New"
            className="w-6 h-6"
          />
            <svg
              className={`w-4 h-4 ${isProfileOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded">
              <div className="py-2">
                <div className="px-4 py-2 text-gray-700">
                  {/* <p className="font-semibold">{account.name}</p>
                  <p className="text-xs text-gray-500">{account.email}</p> */}
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <hr className="border-gray-300" />
                
                <hr className="border-gray-300" />
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 focus:outline-none"
                onClick={onClickSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
