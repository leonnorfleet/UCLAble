import Axios from 'axios';
import { useEffect, useState } from 'react';
import Report from './Report';
import Popup from './Popup';
import CreatableSelect from 'react-select/creatable'
import options from '../objects/Filters';
import { voteSort, dateSort, titleSort, locationSort } from '../objects/Sorts';

function View() {
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
        <>
        <CreatableSelect
            options={options}
            isClearable={true}
            onChange={handleChange}
        />
        <ReportPopups forms={formData} original={initial}/>
        </>
    )
}

const ReportPopups = ({original, forms}) => {
    const [isOpen, setOpen] = useState([])

    function Vote(id, state) {
        const obj = {idString: id, liked: state}

        Axios.put('http://localhost:8080/vote-post', obj).then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        const init = Array.from({length: original.length}, () => false);
        setOpen(init);
    }, [original]);

    // setOpen(prevState => prevState.map((state, i) => (i === index ? !state : state)))

    return (
        <>
        {forms.map((item, index) => {
                return (
                    <li key={index}>
                        <div onClick={() => setOpen(prevState => prevState.map((state, i) => (i === index ? !state : state)))}>
                            {item.title} <br/>
                            <button>{'^'}</button> {item.votes}
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
                                func={Vote}
                                votes={item.votes}
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