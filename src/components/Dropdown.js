import React, {useState} from 'react'
import Select from 'react-select'
import '../styles/dropdown.css';

export default function Dropdown(props) {
    const [selOption, setOption] = useState(props.options[0]);

    function handleChange(selOption) {
        console.log('calling sorting function for:', selOption.label);
        setOption(selOption.label);
        // props.func(selOption);
    }

    return(
        <div className="select-container">
            <Select 
                defaultValue={selOption}
                onChange={handleChange}
                options={props.options}
                className="select-menu"
                classNamePrefix="select"
            />
        </div>
    )
}