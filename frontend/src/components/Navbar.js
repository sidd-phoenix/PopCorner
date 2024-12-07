import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // To store user info

  const handleSignInClick = () => {
    console.log("button clicked")
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsLoggedIn(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar bg-base-100 px-4">
      {/* Logo */}
      <div className="flex-1">
        <img
          src="/logo.png"
          className="btn btn-ghost"
          onClick={handleLogoClick}
        ></img>
      </div>

      {/* Search Box */}
      <div className="flex-1 mx-4">
        <div className="form-control w-full">
          <input
            type="text"
            placeholder="Search for Movies"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Location Dropdown */}
      <div className="flex-none px-2">
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost">
            Ahmedabad
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sign In Button or Profile Picture */}
      <div className="flex-none">
        {isLoggedIn ? (
          <button onClick={handleProfileClick}>
            <img
              src={user?.picture || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </button>
        ) : (
          <button
            onClick={handleSignInClick}
            className="btn btn-primary bg-red-500 border-none text-white px-6"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
