import Axios from 'axios';
import { useEffect, useState } from 'react';
import Report from './Report';
import Popup from './Popup';
import '../styles/view.css';
import CreatableSelect from 'react-select/creatable';
import options from './Filters';
import { voteSort, dateSort, locationSort, titleSort } from '../functions/Sorts';

function View() {
    const [formData, setForms] = useState([])
    const [loading, setLoading] = useState(true);
    const [selOption, setOption] = useState(options[1]);

    if (loading) {} // dealing with annoying warning

    useEffect(() => { // The forms will automatically render on page load
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8080/view-posts')
                //console.log(res.data)
                setForms(dateSort(res.data.map(obj => ({...obj, date: new Date(obj.date)})), 'd'));
                setLoading(false)
            }
            catch (err) {
                console.log(err)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const forms = formData;

    function handleChange(selOption) {
        if (selOption == null) {
            console.log('reverting to original state');
            console.log(forms);
            return;
        }
        console.log('calling sorting function for:', selOption.label);
        setOption(selOption.label);
        switch(selOption.value) {
            case 'votes':
                setForms(voteSort(formData));
                break;
            case 'date':
                setForms(dateSort(formData, 'd'));
                break;
            default:
                if (selOption.label.includes('title: ')) {
                    setForms(titleSort(formData, selOption.label.slice(7)));
                }
                else {
                    setForms(locationSort(formData, selOption.label));
                }
                break;
        }
        // props.func(selOption);
    }

    return (
        <div className="view-container">
            <h1>Reports</h1>
            <div className="filter-container">
                <h2>Filter by:</h2>
                <CreatableSelect
                    isClearable={true}
                    options={options}
                    onChange={handleChange}
                    defaultValue={options[1]}
                    className="custom-select"
                />
            </div>
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
        <div className="report-list">
        {forms.map((item, index) => {
                return (
                    <li key={index}>
                        <div className="report-item">
                            <button onClick={() => setOpen(prevState => prevState.map((state, i) => (i === index ? !state : state)))}>
                                {item.title} <br/> Current Number of Votes: {item.votes}</button>
                        </div>
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
        </div>
    );
}

export default View;