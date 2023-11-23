const { useState } = require("react")


function Report({id, name, location, title, description, date}) {

    return (
        <div>
            <p>{id}, {title} <br/>
            Posted by: {name} on {date} <br/>
            {location}: {description}</p>
        </div>
    )
}

export default Report;