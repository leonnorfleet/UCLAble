import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ profile }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (profile) {
      axios.post('http://localhost:8080/account-interact', { id: profile.id, email: profile.email, name: profile.name })
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => console.log(error));
    }
  }, [profile]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Liked Posts: {userData.likedPostsCount}</p>
    </div>
  );
}

export default Profile;
