import React from 'react'
import Axios from 'axios'
import Form from './Form';
import '../styles/post.css';

function Post(props) {

    function handleClick(obj) { // Function for uploading an object that can be passed to the form components(report, account, etc.)
        Axios.post('http://localhost:8080/upload-report', obj).then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div className="post-container">
             <div className="report-container">
                <h1>Post a Report</h1>
                {/*<p>{props.profile ? props.profile.name : 'log in I know where you live'}</p>*/}
                <br/>
                <Form func={handleClick} profile={props.profile}/>
            </div>
        </div>
    );
}

export default Post;