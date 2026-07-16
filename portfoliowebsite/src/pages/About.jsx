import './About.css';

const About = () => {
    return (
        <div className="container about">
            <h2>Hello, my name is Vedh.</h2>
            <h3 className="aboutRole">I am a Software Engineer based in the Bay Area</h3>
            <div className="linkRow">
                <a className="pill" href="https://github.com/Shades-of-Dark">Github</a>
                <a className="pill" href="https://www.linkedin.com/in/vedh-rao-94b0723b3/">Linkedin</a>
            </div>
            <div className="aboutBody">
                <h2>About Me</h2>
                <p className="placeholder">More about me — coming soon.</p>
            </div>
        </div>
    );
}

export default About;
