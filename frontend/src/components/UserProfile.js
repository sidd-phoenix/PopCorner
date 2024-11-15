import React, { useState } from 'react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    profilePicture: 'https://via.placeholder.com/150',
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    bio: 'This is a short bio about John Doe.',
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <img
          src={userInfo.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
      </div>

      {/* User Info */}
      <div className="text-center">
        {isEditing ? (
          <>
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleInputChange}
              className="text-xl font-semibold mb-2 w-full text-center border-b-2 border-gray-300 outline-none focus:border-blue-500"
            />
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="text-gray-500 mb-2 w-full text-center border-b-2 border-gray-300 outline-none focus:border-blue-500"
            />
            <textarea
              name="bio"
              value={userInfo.bio}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2">{userInfo.username}</h2>
            <p className="text-gray-500 mb-2">{userInfo.email}</p>
            <p className="text-gray-700">{userInfo.bio}</p>
          </>
        )}
      </div>

      {/* Edit Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
