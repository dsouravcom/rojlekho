import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return unsubscribe; // Cleanup function to remove the listener
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoute;
