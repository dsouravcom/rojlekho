import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import{ auth } from "../../../firebase.js"
import{ sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
 
function ForgotPass() {
  const [email, setEmail] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await sendPasswordResetEmail(auth, email);
        setEmail("");
        Swal.fire({
          icon: "success",
          title: "Email sent",
          text: "Check your email to reset your password",
          showConfirmButton: false,
          timer: 2000,
        });
        Navigate("/login");
    } catch (error) {
      setError(error.code);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-indigo-600"
              >
                send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
