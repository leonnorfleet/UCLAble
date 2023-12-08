import React from 'react';

function Profile(props) {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {props.profile.name}</p>
      <p>Email: {props.profile.email}</p>
      <p>Liked Posts: {props.likedPostsCount}</p>
    </div>
  );
}

export default Profile;
