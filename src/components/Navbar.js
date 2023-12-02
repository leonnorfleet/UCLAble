import { Link } from "react-router-dom"
import '../styles/navbar.css';

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/make-a-report">Make a Report</Link>
            <Link to="/see-reports">View Reports</Link>
            <ul>
            </ul>
        </nav>
    )
}