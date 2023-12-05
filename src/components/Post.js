import React from 'react'
import Axios from 'axios'
import Form from './Form'
import '../styles/post.css';

function Post() {

    function handleClick(obj, target='upload-report') { // Function for uploading an object that can be passed to the form components(report, account, etc.)
        Axios.post(`http://localhost:8080/${target}`, obj).then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div className="post-container">
            <h1>Post a Report</h1>
            <Form func={handleClick}/>
        </div>
    );
}

export default Post;