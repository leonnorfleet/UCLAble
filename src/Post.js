import React from 'react'
import Axios from 'axios'

function Post() {

    function handleClick() {
        Axios.post('http://localhost:5000/upload', {
            name: 'name2022',
            email: 'name2022@email.com',
            password: 'passwordnumber50044'
        }).then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div>
        <button onClick={handleClick}>Click me to send the form</button>
        </div>
    );
}

export default Post;