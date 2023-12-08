import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Make a request to fetch user profile based on the provided userId
        const response = await axios.get(`http://localhost:8080/user-profile?userId=${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div>
      <h2>User Profile</h2>
      {profileData ? (
        <>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Number of Posts: {profileData.numberOfPosts}</p>
          <p>Number of Liked Posts: {profileData.numberOfLikedPosts}</p>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
