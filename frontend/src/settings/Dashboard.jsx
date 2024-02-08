import React, { useEffect, useState, useRef } from "react";
import { auth, storage } from "../../firebase.js";
import {
  updatePassword,
  verifyBeforeUpdateEmail,
  updateProfile,
  signOut,
  deleteUser,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

import verified_tick from "../assets/verified.svg";
import not_verified from "../assets/not-verified.svg";

function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);
  const [overSize, setOverSize] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setName(user.displayName);
        setEmail(user.email);
        setVerified(user.emailVerified);
        setAvatar(user.photoURL);
      }
    });
  }, [forceUpdateFlag, overSize]);
  // update the name
  const onNewNameHandleClick = async (e) => {
    e.preventDefault();
    const newName = document.getElementById("new_name").value;
    if (newName) {
      await updateProfile(auth.currentUser, {
        displayName: newName,
      }).then(() => {
          setName(newName);
          document.getElementById("new_name").value = "";
          Swal.fire({
            title: "Name Updated Successfully!",
            text: "Your name has been updated successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // update the email
  const onNewEmailHandleClick = async (e) => {
    e.preventDefault();
    const newEmail = document.getElementById("new_email").value;
    if (newEmail) {
      await verifyBeforeUpdateEmail(auth.currentUser, newEmail)
        .then(() => {
          Swal.fire({
            title: "Email Send Successfully!",
            text: "A verification link has been sent to your new email address. Please verify your email address to update it.",
            icon: "success",
            confirmButtonText: "OK",
          });
          signOut(auth)
            .then(() => {
              console.log("sign out successful");
              navigate("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // update the password
  const onNewPasswordHandleClick = async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById("new_password").value;
    if (newPassword) {
      await updatePassword(auth.currentUser, newPassword)
        .then(() => {
          Swal.fire({
            title: "Password Updated Successfully!",
            text: "Your password has been updated successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          signOut(auth)
            .then(() => {
              console.log("sign out successful");
              navigate("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // handle image
  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  //file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.size <= 2 * 1024 * 1024) {
      const storageRef = ref(
        storage,
        `avatars/${auth.currentUser.uid}/${file.name}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, { photoURL: url });
      // setFoerceFlag to update the image
      setForceUpdateFlag((prev) => !prev);
      setOverSize(false);
    } else {
      if (!file) {
        setOverSize((prev) => !prev);
      }
      // alert("Please select an image under 2MB.");
      setOverSize((prev) => !prev);
    }
  };

  const onDeleteAvatar = async () => {
    await updateProfile(auth.currentUser, {
      photoURL:
        "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
    });

    setForceUpdateFlag((prev) => !prev);
  };

  const onDeleteHandle = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${import.meta.env.VITE_APP_DELETE_ACCOUNT_URL}?uid=${auth.currentUser.uid}`);
          await deleteUser(auth.currentUser)
          .then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        })
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-8 min-h-screen">
        <div className="p-2 mb-4">
          <h1 className="font-bold text-3xl mb-[2px]">Account settings</h1>
          <span className="font-serif">edit your name, email, password</span>
        </div>

        <div className="container shadow-lg border-2 p-4 md:px-10 lg:px-20 xl:px-32 py-8">
          <div className="flex flex-col md:flex-row-reverse">
            {/* Avatar */}
            <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
              <img
                alt="avatar"
                className="w-40 h-40 rounded-full border-2 p-2 mb-4 mx-auto"
                src={
                  avatar
                    ? avatar
                    : "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                }
                // key={forceUpdateFlag}
              />
              <div className="flex justify-center gap-x-2">
                {/* Button */}
                <div className=" flex items-center justify-center">
                  <label
                    htmlFor="imageUpload"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#3490dc",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      transition: "background-color 0.3s",
                      userSelect: "none",
                    }}
                    onClick={handleButtonClick}
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  className="bg-red-600 px-2 py-[10px] text-white rounded"
                  onClick={onDeleteAvatar}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 25 25"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              {/* /Button */}
              <span
                className="text-red-500"
                style={overSize ? { display: "block" } : { display: "none" }}
              >
                !Please select a photo under 2mb
              </span>
            </div>

            {/* Forms */}
            <div className="w-full md:w-2/3 font-bold">
              {/* Name changing form */}
              <form
                className="max-w-md mx-auto mb-4"
                onSubmit={onNewNameHandleClick}
              >
                <div className="flex flex-col mb-2">
                  <label>Current name</label>
                  <input
                    type="text"
                    placeholder={name}
                    className="border p-2"
                    disabled
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="new_name">New name</label>
                  <input
                    type="text"
                    id="new_name"
                    placeholder="New name"
                    className="border p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-2 py-[3px] rounded-md mt-4 hover:bg-blue-700"
                >
                  Save
                </button>
              </form>

              {/* Email changing form */}
              <form
                className="max-w-md mx-auto mt-4"
                onSubmit={onNewEmailHandleClick}
              >
                <div className="flex flex-col mb-2">
                  <div className="flex ">
                    <label htmlFor="email" className="mr-2">
                      Current Email
                    </label>
                    <img
                      width="15"
                      height="15"
                      src={verified ? verified_tick : not_verified}
                      alt="experimental-checked-skeuomorphism"
                    />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder={email}
                    className="border p-2"
                    disabled
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="new_email">New Email</label>
                  <input
                    type="email"
                    id="new_email"
                    placeholder="example@email.com"
                    className="border p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-2 py-[3px] rounded-md mt-4 hover:bg-blue-700"
                >
                  Save
                </button>
              </form>

              {/* Password changing form */}
              <form
                className="max-w-md mx-auto mt-4"
                onSubmit={onNewPasswordHandleClick}
              >
                <div className="flex flex-col mb-2">
                  <label htmlFor="new_password">New password</label>
                  <input
                    type="password"
                    id="new_password"
                    placeholder="*****"
                    className="border p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-2 py-[3px] rounded-md mt-4 hover:bg-blue-700"
                >
                  Save
                </button>
              </form>

              {/* Delete account */}
              <div className="flex flex-col mt-6 p-4">
                <h1 className="font-bold text-2xl">Delete account</h1>
                <span className="my-2 text-sm">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </span>
                <button
                  className="bg-red-500 text-white flex justify-center p-2 rounded-md"
                  onClick={onDeleteHandle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 30 23"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
