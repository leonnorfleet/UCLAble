import Axios from 'axios';
import { useEffect, useState } from 'react';
import Report from './Report';
import Popup from './Popup';
import CreatableSelect from 'react-select/creatable'
import options from '../objects/Filters';
import { voteSort, dateSort, titleSort, locationSort } from '../objects/Sorts';
import '../styles/view.css';

function View(props) {
    const [initial, setInit] = useState([]); // Original copy for reversion
    const [formData, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState();

    if (loading | option) {} // Fixing annoying warning

    useEffect(() => { // The forms will automatically render on page load
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8080/view-posts')
                //console.log(res.data)
                const resArr = dateSort(res.data.map(item => ({
                    ...item,
                    date: new Date(item.date)
                })));
                setInit(resArr);
                setForms(resArr)
                setLoading(false)

            }
            catch (err) {
                console.log(err)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Handle dropdown selections to modify the current list of reports
    function handleChange(option) {
        setOption(option);
        if (option == null) {
            setForms(initial);
            return;
        }
        let changed = [];
        switch(option.value) {
            case 'votes':
                changed = voteSort(formData, 'd');
                break;
            case 'date':
                changed = dateSort(formData, 'd');
                break;
            default:
                if (option.label.includes('title: ')) {
                    changed = titleSort(formData, option.label.slice(7));
                }
                else {
                    changed = locationSort(formData, option.label);
                }
                break;
        }
        setForms(changed);
    }

    return (
        <div className="view-container">
            <h1>Reports</h1>
            <div className="filter-container">
            <h2>Filter by:</h2>
            <CreatableSelect
                className="custom-select"
                options={options}
                isClearable={true}
                onChange={handleChange}
            />
        </div>
        <ReportPopups forms={formData} original={initial} profile={props.profile} func={setForms}/>
        </div>
    )
}

//Automatically generate the reports from the get request to mongodb
const ReportPopups = ({original, forms, profile, func}) => {
    const [isOpen, setOpen] = useState([]);

    async function Vote(id, index) { // Dynamically change the number of votes for a logged in user on both the client and server together
        if (profile == null) {
            alert('Please log in to upvote reports.');
            return;
        }

        // formatting necessary data for server call
        const obj = {idString: id, userid: profile.id}
        // call to node server
        await Axios.put('http://localhost:8080/vote-post', obj).then(res => {
            console.log(res.data);
            func((prevForms) => // change the value and state of the report that was voted on
                prevForms.map((forms, i ) =>
                    i === index ? {...forms, votes: forms.votes + res.data.code} : forms
                )
            )
        })
        .catch(err => console.log(err))
    }

    useEffect(() => { // set initial state of array of reports
        const init = Array.from({length: original.length}, () => false);
        setOpen(init);
    }, [original]);

    return (
        <>
        {forms.map((item, index) => {
                return (
                    <li key={index}>
                        <div onClick={() => setOpen(prevState => prevState.map((state, i) => (i === index ? !state : state)))}>
                            {item.title}
                        </div>
                        <br/>
                        <button onClick={() => {Vote(item._id, index)}}>{'^'} {item.votes}</button>
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
                        />}
                        />
                    </li>   
                )
            })}
        </>
    );
}

/*const Reports = ({forms}) => (
    <>
    {forms.map(item => {
            return (
                <Report
                    key={item._id}
                    props={item}
                />
            )
        })}
    </>
);*/

export default View;