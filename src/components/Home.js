import ThemeToggle from './ThemeToggle.js'
import { Link } from "react-router-dom"
import '../styles/home.css';

function Home() {
    return (
        <div className="home-container">
        <h2>Welcome to</h2>
        <h1>UCLAble</h1>

        <Link to="/sign-up">Sign Up</Link>
        <ThemeToggle/>
        </div>
    )
}

export default Home;