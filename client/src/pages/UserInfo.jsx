import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const UserInfo = () => {
   
  const {  user } = useSelector((state) => state.user);
  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-1">
          <img
            src={user?.data?.profilePicture || "https://thvnext.bing.com/th/id/OIP.YDyoIafIwW1tILED3HgZRQHaHa?w=183&h=185&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3"}
            alt="profile"
            className="w-16 h-16 rounded-full shadow-md"
          />
          <div>
            <h2 className="font-bold text-xl text-gray-800">{user?.user?.username}</h2>
            <p className="text-gray-600">{user?.user?.email}</p>
          </div>
        </div>
    </div>
  );
}

export default UserInfo;
