import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-4">
      {/* Logo */}
      <div className="flex-1">
        <button href='https://localhost:3000'>
          <a className="btn btn-ghost text-xl">MoviesNOW</a>
        </button>
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
            {/* Location from DB */}
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

      {/* Sign In Button */}
      <div className="flex-none">
        <button className="btn btn-primary bg-red-500 border-none text-white px-6">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
