import Axios from "axios";

function View() {

    function handleClick() {
        Axios.get('http://localhost:5000/view-posts').then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <>
        <button onClick={handleClick}>CLICK ME</button>
        </>
    )
}

export default View;