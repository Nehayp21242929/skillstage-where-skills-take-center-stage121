import React, { useState } from "react";
import { FaBell, FaBars, FaUpload, FaCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DarkMode from './DarkMode';
import { useAuth } from "../context/AuthContext";



const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-300 border-white dark:bg-gray-900 px-4 py-3 shadow-md flex items-center justify-between">
      {/* Left: Brand Name */}
      <div className="flex items-center space-x-4">
        <h2
          onClick={() => navigate("/")}
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "'Montserrat', sans-serif" ,
            cursor: "pointer",
            background: "linear-gradient(90deg, #3895D3, #58CCED)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SkillStage
        </h2>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 ml-6 text-gray-800 dark:text-gray-200 font-medium">
          <button onClick={() => navigate("/")} className="hover:underline">Home</button>
          <button onClick={() => navigate("/trending")} className="hover:underline">Trending</button>
          <button onClick={() => navigate("/VideoPage")} className="hover:underline ">Videos</button>
          <button onClick={() => navigate("/PhotoPage")} className="hover:underline ">Photos</button>
          <button
            onClick={() => navigate("/explore")}
            className="flex items-center space-x-1 hover:underline"
          >
            <FaCompass /> <span>Explore</span>
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden sm:block px-3 py-1.25 rounded border border-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out w-70 focus:w-90"
         />

        {/* Upload Button */}
        {user && (
          <button
            onClick={() => navigate("/uploadForm")}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            <FaUpload className="mr-1" /> Upload
          </button>
        )}

        {/* Notifications */}
        {user && (
          <div className="relative">
            <FaBell className="text-xl cursor-pointer text-black dark:text-white" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              3
            </span>
          </div>
        )}

        {/* Theme Toggle */}
          <div>
              <DarkMode/>
            </div>


        {/* Profile Avatar */}
        {user ? (
          <div className="relative">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="block w-full text-left px-4 py-2    text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500"
          >
            Login
          </button>
        )}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars className="text-black dark:text-white"/>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-14 right-2 mt-2 w-50 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 border py-2 border-gray-200 dark:border-gray-700 flex flex-col space-y-3">
          <button onClick={() => navigate("/")} className="block w-full px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</button>
          <button onClick={() => navigate("/trending")} className="block w-full px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Trending</button>
          <button onClick={() => navigate("/VideoPage")} className="block w-full px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Videos</button>
          <button onClick={() => navigate("/PhotoPage")} className="block w-full px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Photos</button>
          <button onClick={() => navigate("/explore")} className="block w-full px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Explore</button>
          {user && (
            <>
              <button onClick={() => navigate("/upload")} className="block w-full px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Upload
              </button>
              <button onClick={() => navigate("/profile")} className="block w-full px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</button>
              <button onClick={() => navigate("/settings")} className="block w-full px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</button>
              <button onClick={logout} className="block w-full px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 hover:underline">Logout</button>
            </>
          )}
          {!user && (
            <button onClick={() => navigate("/login")} className="block ml-4 mr-4 px-4 py-2  bg-green-600 text-white rounded hover:text-gray-200">
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
