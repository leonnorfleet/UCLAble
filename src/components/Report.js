import { useEffect} from "react";

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

    return (
        <div>
            <div>
                <h2>{props.title}</h2>
                <p>Posted by: {props.name} on {fdate}</p>
                <p>Location: {props.location}</p>
                <p>{props.description}</p>
            </div>
            <button className='vote-btn' onClick={() => handleClick()}>Vote {props.votes}</button>
        </div>
    )
}

export default Report;