import { useEffect } from "react";

function Report({_id, title, name, date, location, description}) {

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Use 24-hour format
    };

    useEffect(() => {
        console.log(`form id ${_id} loaded!`, )
    });

    date = new Date(date).toLocaleString('en-US', options)

    return (
        <div>
            <div>
                <h2>{title}</h2>
                <p>Posted by: {name} on {date}</p>
                <p>Location: {location}</p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Report;