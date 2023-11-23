import Axios from 'axios';
import { useEffect, useState } from 'react';
import Report from './Report';

function View() {

    const [formData, setForms] = useState([])

    function getForms() {
        Axios.get('http://localhost:5000/view-posts').then(res => { 
            console.log(res.data)
            setForms(res.data) 
        })
        .catch(err => console.log(err))
    }

    useEffect(() => { // The forms will automatically render on page load
        let ignore = false

        if (!ignore) { getForms() }

        return () => { ignore = true}
    }, [])

    return (
        <>
        <Reports forms={formData}/>
        </>
    )
}
const Reports = ({forms}) => (
    <>
    {forms.map(item => {
            return (
                <Report
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    name={item.name}
                    location={item.location}
                    description={item.description}
                    date={item.date}
                />
            )
        })}
    </>
);

export default View;