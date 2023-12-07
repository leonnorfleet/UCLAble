import { Link } from "react-router-dom"

export default function Navbar(props) {
    return (
        <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/make-a-report">Make a Report</Link>
            <Link to="/see-reports">View Reports</Link>
            <p>{props.profile ? props.profile.name : ''}</p>
            <props.button/>
        </nav>
    )
}