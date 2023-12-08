import '../styles/navbar.css';
import logo from '../imgs/uclable_logo.png';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
    const navigate = useNavigate();

    const goToProfile = () => {
        if (props.profile) {
            navigate(`/profile/${props.profile.id}`);
        }
    };

    return (
        <nav className="nav">
            <div className="nav-logo">
                <img src={logo} alt="UCLAble Logo"/>
            </div>
            <ul className="nav-links-left">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/make-a-report">Make a Report</Link></li>
                <li><Link to="/see-reports">View Reports</Link></li>
            </ul>
            <ul className="nav-links-right">
                {props.profile && (
                    <li>
                        <p onClick={goToProfile} style={{cursor: 'pointer'}}>{props.profile.name}</p>
                    </li>
                )}
                <li>
                    <props.button/>
                </li>
            </ul>
        </nav>
    );
}
// changing the profile to be a button code needs to fixed? 