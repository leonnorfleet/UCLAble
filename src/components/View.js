import Axios from 'axios';
import { useEffect, useState } from 'react';
import Report from './Report';
import Popup from './Popup';
import '../styles/view.css';
import Dropdown from './Dropdown';

function View() {
    const [formData, setForms] = useState([])
    const [loading, setLoading] = useState(true);

    if (loading) {} // dealing with annoying warning

    useEffect(() => { // The forms will automatically render on page load
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8080/view-posts')
                //console.log(res.data)
                setForms(res.data.map(obj => ({...obj, date: new Date(obj.date)})));
                setLoading(false)
            }
            catch (err) {
                console.log(err)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const options = [
        {value: 'votes', label: 'Votes'},
        {value: 'date', label: 'Date'},
        {value: 'location', label: 'Location'},
    ];

    return (
        <div className="view-container">
            <h1>Filter by:</h1>
            <Dropdown options={options}/>
            <ReportPopups forms={formData} />
        </div>
    )
}

/*
After receiving all of the forms from the mongodb database in the form of a logn object array, we will map them to components that
will be rendered generatively and will each display the unique information of the individual reports posted.
*/
const ReportPopups = ({forms}) => {
    const [isOpen, setOpen] = useState([])

    function Vote(id, state) {
        const obj = {idString: id, liked: state}

        Axios.put('http://localhost:8080/vote-post', obj).then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        const initialIsOpen = Array.from({ length: forms.length }, () => false);
        setOpen(initialIsOpen);
      }, [forms]);

    return (
        <>
        {forms.map((item, index) => {
                return (
                    <li key={index}>
                        <button onClick={() => setOpen(prevState => prevState.map((state, i) => (i === index ? !state : state)))}>
                            {item.title} <br/> {item.votes}</button>
                        <Popup 
                            trigger={isOpen[index]}
                            handleClose={() => setOpen(prevState => prevState.map((state, i) => (i === index ? !state : state)))}
                            content={<Report 
                                id={item._id}
                                title={item.title}
                                name={item.name}
                                date={item.date}
                                location={item.location}
                                description={item.description}
                                votes={item.votes}
                                voteFunc={Vote}
                        />}
                        />
                    </li>   
                )
            })}
        </>
    );
}

export default View;