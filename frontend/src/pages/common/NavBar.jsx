import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
import api from "../../api/api";
import Home_img from "../../assets/home-icon.svg";
import Logo from "../../assets/logo.png";
import UserContext from "../../context/UserContext";

const NavBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, loading } = useContext(UserContext);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  // function for sign out
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
                  <Link to="/plans">
                    <button className="w-full flex gap-1 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none">
                      <Crown className="w-5 h-5 text-orange-400" />
                      {user.premiumUser ? "Premium" : "Upgrade"}
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
