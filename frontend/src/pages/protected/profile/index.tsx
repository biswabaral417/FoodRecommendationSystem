import React from 'react';
import LazyImage from '../../../core/components/atoms/lazyImage/LazyImage';

const Profile: React.FC = () => {
  const rawUser = localStorage.getItem('user');

  if (!rawUser) {
    return <div className="text-red-500 text-center mt-10">User not found</div>;
  }

  let user;
  try {
    user = JSON.parse(rawUser)?.userDetails;
  } catch (e) {
    return <div className="text-red-500 text-center mt-10">Invalid user data</div>;
  }

  if (!user) {
    return <div className="text-red-500 text-center mt-10">User details missing</div>;
  }

  return (
    <div className="flex justify-center mt-12 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <div className="flex flex-col items-center">
          {user.imageUrl ? (
            <LazyImage
              src={user.imageUrl.replace('/upload/', '/upload/w_100,h_100,c_fill/')}
              alt={`${user.fname} ${user.lname}`}
              className="w-[100px] h-[100px] rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-gradient-to-tr from-indigo-500 to-blue-400 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-md mt-4">
              {user.fname?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Full Name */}
          <h2 className="text-2xl font-semibold mt-4 capitalize">
            {user.fname} {user.lname}
          </h2>

          {/* Email */}
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>

          {/* Divider */}
          <div className="border-t border-gray-200 w-full my-6"></div>

          {/* Info Grid */}
          <div className="text-left w-full space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Phone:</span>
              <span>{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Address:</span>
              <span>{user.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">User ID:</span>
              <span>{user.id}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-full transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
