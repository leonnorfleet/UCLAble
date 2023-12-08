import { useState } from 'react'
import Select from 'react-select'
import uclaBuildings from '../objects/Buildings' // list of ucla buildings for dropdown

function Form(props) {

    const [formData, setFormData] =  useState({title: '', description: ''});
    const [option, setOption] = useState();

    const handleChange = (event) => { // Updating the form data as users type
		const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

    // Function for changes made to the dropdown selection
    const handleSubmit = (event) => {
        event.preventDefault();

        for (let key in formData) {
          if (formData[key] === '') {
            return; // Exit the function if any field is empty
          }
        }

        if (option == null) { // dont submit if if the dropdown is null/undefined
            return;
        }

        if (props.profile == null) { // dont submit if not logged in
            alert('Please log in to post a report.')
            return;
        }
      
        // If all fields are not empty, execute the following code
        let subData = {uid: props.profile.id, name: props.profile.name, location: option.label,
            title: formData.title, description: formData.description};
        props.func(subData);
        //console.log(subData);
        setFormData({title: '', description: '' });
        setOption(null);
        alert('Form Submitted!');
    };

    function handleSelect (option) {
        setOption(option);
        //console.log(option);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Select
                    options={uclaBuildings}
                    isClearable={true}
                    onChange={handleSelect}
                    placeholder={'Select a Location...'}
                />

                <label htmlFor='title'></label>
                <input type='text' id='title' name='title' value={formData.title} onChange={handleChange} placeholder='Title'/>

                <label htmlFor='description'></label>
                <textarea rows="12" columns="20" id='description' name='description' value={formData.description} onChange={handleChange} placeholder='  Description'/>
                
                <br/>
                <button type='submit'>Submit</button>
            </form>
            <p></p>
        </div>
    );
}

export default Form;