import React from 'react';

interface MyProfileProps {
  profilePicture: string;
}

const MyProfile: React.FC<MyProfileProps> = ({
  profilePicture,

}) => {
  return (
    <div className="flex w-3/4 border border-gray-200 p-4 rounded-lg inset-x-0 bottom-0">
      <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h2 className="font-bold text-lg">{'Profile'}</h2>
      </div>
    </div>
  );
}

export default MyProfile;