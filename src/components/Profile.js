import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Profile(props) {

  return (
    <>
    {props.profile ? (<div>
      <h2>User Profile</h2>
      <p>Name: {props.profile.name}</p>
      <p>Email: {props.profile.email}</p>
      <p>Number of Liked Posts: {props.likes}</p>
    </div>) : (
      <h2>Loading...</h2>
    )}
    </>
  );
}

export default Profile;