import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import api from "../../api/api";
import UserContext from "../../context/UserContext";
import Home_img from "../../assets/home-icon.svg";
import Logo from "../../assets/logo.png";

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const [user, setUser] = useState("");
  // const [isVerified, setIsVerified] = useState(true);
  const { user, loading } = useContext(UserContext);

  // const navigate = useNavigate();
  // send email verification
  // const onHandleEmailSendAgain = async (e) => {
  //   e.preventDefault();
  //   // await sendEmailVerification(auth.currentUser);
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: "top-end",
  //     showConfirmButton: false,
  //     timer: 1500,
  //     timerProgressBar: true,
  //     didOpen: (toast) => {
  //       toast.onmouseenter = Swal.stopTimer;
  //       toast.onmouseleave = Swal.resumeTimer;
  //     },
  //   });
  //   Toast.fire({
  //     icon: "success",
  //     title: "Email send successfully check your email",
  //   });
  // };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  // fuction for sign out
  const onClickSignOut = async () => {
    try {
      await api.post("/auth/logout");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <>Loading...</>;
  return (
    <>
      {/* <div
        className="bg-indigo-600"
        style={isVerified === false ? { display: "flex" } : { display: "none" }}
      >
        <div className="max-w-screen-xl mx-auto px-4 py-2 items-center gap-x-4 justify-center text-white sm:flex md:px-8">
          <p className="py-2 font-medium">
            Your email is not verified. Please verify your email and continue
            using the app.
          </p>
          <button
            onClick={onHandleEmailSendAgain}
            className="flex-none inline-block w-full mt-3 py-2 px-3 text-center text-indigo-600 font-medium bg-white duration-150 hover:bg-gray-100 active:bg-gray-200 rounded-lg sm:w-auto sm:mt-0 sm:text-sm"
          >
            send email again
          </button>
        </div>
      </div> */}
      <nav className="bg-gray-800 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={Home_img} alt="Home" />
          </Link>
        </div>
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-48" />
        </div>
        <div className="flex items-center">
          <div className="relative z-50">
            <button
              className="text-white flex items-center focus:outline-none"
              onClick={toggleProfile}
            >
              <img
                src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                alt="Create New"
                className="w-6 h-6 rounded-full"
              />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded">
                <div className="py-2">
                  <div className="px-4 py-2 text-gray-700">
                    <p className="font-semibold">
                      {loading ? "loading" : user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {loading ? "loading" : user.email}
                    </p>
                  </div>
                  <hr className="border-gray-300" />

                  <hr className="border-gray-300" />
                  <Link to="/account">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
                      Account
                    </button>
                  </Link>
                  <hr className="border-gray-200" />
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 focus:outline-none"
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
    </>
  );
};

export default NavBar;
