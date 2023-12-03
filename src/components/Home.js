import ThemeToggle from './ThemeToggle.js'
import '../styles/home.css';

function Home() {
    return (
        <div className="home-container">
        <h2>Welcome to</h2>
        <h1>UCLAble</h1>

        <ThemeToggle/>
        </div>
    )
}

export default Home;