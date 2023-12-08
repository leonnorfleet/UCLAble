import { Link } from "react-router-dom"
import '../styles/navbar.css'
import logo from '../imgs/uclable_logo.png';

export default function Navbar(props) {
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
            <p>{props.profile ? props.profile.name : ''}</p>
            <props.button/>
            </ul>
        </nav>
    )
}