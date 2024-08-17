import React, { useState } from 'react';

const ProfilePictureUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await fetch('/upload-profile-picture', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('File uploaded successfully:', data.filePath);
      // Vous pouvez également mettre à jour l'état global ou local pour afficher la nouvelle photo
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ProfilePictureUpload;
