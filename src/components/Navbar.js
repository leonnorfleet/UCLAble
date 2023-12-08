import { Link } from "react-router-dom"
import '../styles/navbar.css'
import logo from '../imgs/logo.png';
import ThemeToggle from './ThemeToggle.js';

export default function Navbar(props) {
    return (
        <nav className="nav">
            <div className="nav-logo">
            <Link to="/"><img src={logo} alt="UCLAble Logo"/></Link>
            </div>
            <ul className="nav-links-left">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/make-a-report">Make a Report</Link></li>
                <li><Link to="/see-reports">View Reports</Link></li>
            </ul>
            <ul className="nav-links-right">
            <li>{props.profile ? props.profile.name : ''}</li>
            <props.button/>
            <li className="spacer"></li>
            <li><ThemeToggle/></li>
            </ul>
        </nav>
    )
}