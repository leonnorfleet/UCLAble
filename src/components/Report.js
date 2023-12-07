import { useEffect, useState } from "react";
import '../styles/report.css';

function Report(props) {

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Use 24-hour format
    };

    useEffect(() => {
        console.log(`form id ${props.id} loaded!`, )
    });

    let fdate = props.date.toLocaleString('en-US', options)
    const [liked, setLiked] = useState(false)

    function handleClick() {
        setLiked(!liked)
        props.voteFunc(props.id, liked)
    }

    return (
        <div className="big-report-container">
            <div className="text-report-container">
                <h2>{props.title}</h2>
                <p>Posted by: {props.name} on {fdate}</p>
                <p>Location: {props.location}</p>
                <p>Description: {props.description}</p>
            </div>
            <button className='vote-btn' onClick={() => handleClick()}>Vote {props.votes}</button>
        </div>
    )
}

export default Report;