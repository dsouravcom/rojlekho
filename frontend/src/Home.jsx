import React,{useState, useEffect} from 'react'
import {auth} from '../firebase.js'
import NavBar from './components/common/NavBar'


function Home({ userName }) {

  const [user, setUser] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((data) => {
      setUser(data);
    });
    
  }, []);

  console.log(user);

  return (
    <div>
      <NavBar />
        <h1>Home</h1>
        <p>Hello {user.displayName}</p>
        <p>Hello {user.uid}</p>
        <p>your email is "{user.emailVerified ? <span>verified</span> : <span>not verified</span>}"</p>
        <p>Your phone number is "{user.phoneNumber}"</p>

    </div>
  )
}

export default Home