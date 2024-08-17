import React from 'react';

const ProfilePicture = ({ imageUrl }) => {
  return (
    <img
      src={imageUrl || 'https://via.placeholder.com/150'}
      alt="Profile"
    />
  );
};

export default ProfilePicture;
