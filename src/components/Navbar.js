import { Link } from "react-router-dom"
import '../styles/navbar.css'
import logo from '../imgs/uclable_logo.png';

export default function Navbar() {
    return (
        <nav className="nav">
            <div class="nav-logo">
                <img src={logo} alt="UCLAble Logo"/>
            </div>
             <ul>
            <Link to="/">Home</Link>
            <Link to="/make-a-report">Make a Report</Link>
            <Link to="/see-reports">View Reports</Link>
            </ul>
        </nav>
    )
}