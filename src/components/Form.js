import { useState } from 'react';

function Form({func}) {

    const [formData, setFormData] =  useState({name: '', location: '', title: '', 
    description: ''});

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
      
        // If all fields are not empty, execute the following code
        func(formData);
        setFormData({ name: '', location: '', title: '', description: '' });
        alert('Form Submitted!');
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'></label>
                <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} placeholder='Name'/>

                <label htmlFor='location'></label>
                <input type='text' id='location' name='location' value={formData.location} onChange={handleChange} placeholder='Location'/>

                <label htmlFor='title'></label>
                <input type='text' id='title' name='title' value={formData.title} onChange={handleChange} placeholder='Title'/>

                <label htmlFor='description'></label>
                <textarea rows= "12" cols ="18" id='description' name='description' value={formData.description} onChange={handleChange} placeholder=' Description'/>
                
                <br/>
                <button type='submit'>Submit</button>
            </form>
            <p></p>
        </div>
    );
}

export default Form;