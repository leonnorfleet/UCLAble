import React, {useState} from 'react'
import Select from 'react-select'

export default function Dropdown(props) {
    const [selOption, setOption] = useState(props.options[0]);

    function handleChange(selOption) {
        console.log('calling sorting function for:', selOption.label);
        setOption(selOption.label);
        // props.func(selOption);
    }

    return(
        <>
        <Select 
        defaultValue={selOption}
        onChange={handleChange}
        options={props.options}
        />
        </>
    )
}