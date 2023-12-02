import ThemeToggle from './ThemeToggle.js'
import '../styles/home.css';

function Home() {
    return (
        <div className="home-container">
        <h1>UCLAble</h1>
        <h2>Development Build</h2>

        <ThemeToggle/>
        </div>
    )
}

export default Home;