import Axios from 'axios';
import { useEffect, useState } from 'react';
import Report from './Report';
import Popup from './Popup';

function View() {
    const [formData, setForms] = useState([])
    const [loading, setLoading] = useState(true);

    // function getForms() {
    //     Axios.get('http://localhost:5000/view-posts').then(res => { 
    //         console.log(res.data)
    //         setForms(res.data) 
    //     })
    //     .catch(err => console.log(err))
    // }

    useEffect(() => { // The forms will automatically render on page load
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:5000/view-posts')
                console.log(res.data)
                setForms(res.data)
                setLoading(false)
            }
            catch (err) {
                console.log(err)
                setLoading(false)
            }
        }

        fetchData()

        // let ignore = false

        // if (!ignore) { getForms() }

        // return () => { ignore = true}
    }, [])

    return (
        <>
        <ReportPopups forms={formData}/>
        </>
    )
}

const ReportPopups = ({forms}) => {
    const [isOpen, setOpen] = useState([])
    
    useEffect(() => {
        const initialIsOpen = Array.from({ length: forms.length }, () => false);
        setOpen(initialIsOpen);
      }, [forms]);
    // setOpen(prevState => prevState.map((state, i) => (i === index ? !state : state)))

    return (
        <>
        {forms.map((item, index) => {
                return (
                    <li key={index}>
                        <button onClick={() => setOpen(prevState => prevState.map((state, i) => (i === index ? !state : state)))}>{item.title}</button>
                        <Popup 
                            trigger={isOpen[index]}
                            handleClose={() => setOpen(prevState => prevState.map((state, i) => (i === index ? !state : state)))}
                            content={<Report 
                                _id={item._id}
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