import React from 'react';
import '../styles/profile.css'

function Profile(props) {
  return (
    <div className="profile-container">
    {props.profile ? (<div>
      <h2>User Profile</h2>
      <p>Name: {props.profile.name}</p>
      <p>Email: {props.profile.email}</p>
      <p>Liked Posts: {props.likes}</p>
      <p>Total Number of Posts: WIP</p>
    </div>) : (
      <h2>Loading...</h2>
    )}
    </div>
  );
}

export default Profile;