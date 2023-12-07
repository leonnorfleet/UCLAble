import React from 'react'
import Axios from 'axios'
import Form from './Form';

function Post() {

    function handleClick(obj) { // Function for uploading an object that can be passed to the form components(report, account, etc.)
        Axios.post('http://localhost:8080/upload-report', obj).then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Post a Report</h1>
            <br/>
            <Form func={handleClick}/>
        </div>
    );
}

export default Post;