import { useState } from 'react'
import Select from 'react-select'
import uclaBuildings from '../objects/Buildings'

function Form({func}) {

    const [formData, setFormData] =  useState({name: '', title: '', description: ''});
    const [option, setOption] = useState();

    const handleChange = (event) => { // Updating the form data as users type
		const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

    const handleSubmit = (event) => {
        event.preventDefault();

        for (let key in formData) {
          if (formData[key] === '') {
            return; // Exit the function if any field is empty
          }
        }

        if (option == null) {
            return;
        }
      
        // If all fields are not empty, execute the following code
        let subData = {name: formData.name, location: option.label, title: formData.title, description: formData.description};
        func(subData);
        //console.log(subData);
        setFormData({ name: '', title: '', description: '' });
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
                <label htmlFor='name'></label>
                <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} placeholder='Name'/>

                <Select
                    options={uclaBuildings}
                    isClearable={true}
                    onChange={handleSelect}
                />

                <label htmlFor='title'></label>
                <input type='text' id='title' name='title' value={formData.title} onChange={handleChange} placeholder='Title'/>

                <label htmlFor='description'></label>
                <textarea id='description' name='description' value={formData.description} onChange={handleChange} placeholder='Description'/>
                
                <br/>
                <button type='submit'>Submit</button>
            </form>
            <p></p>
        </div>
    );
}

export default Form;