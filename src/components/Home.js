import ThemeToggle from './ThemeToggle.js'
import { Link } from "react-router-dom"
import '../styles/home.css';

function Home() {
    const appDescription = [
        'Roughly 15% of UCLA students have reported having a disability. So, our team realized that needed an app that empowered differently-abled people to navigate UCLA.',
        'Sure, UCLA has the best college campus in the nation. But it\'s not perfect. Every now and then, we come across out-of-order elevators, damaged pavements, incorrectly-placed stop signs, poor lighting, lack of crossing mechanisms, and other issues that affect the ability of differently-abled persons to navigate campus. UCLAble is a platform that allows Bruins to draw attention to these issues and take one step towards making UCLA a more inclusive community.',
        'We\'re making a difference for Bruins, by Bruins. Click the button below and join us today!'
      ];

    return (
        <div className="home-container">
        <h2>Welcome to</h2>
        <h1>UCLAble</h1>

            <div className="home-description-box">
                <h3>Because every Bruin deserves accessibility.</h3>
                {appDescription.map((paragraph, index) => (
                 <p key={index}>{paragraph}</p>
                ))}
                <button>Sign Up Here</button>
            </div>

        </div>
    )
}

export default Home;