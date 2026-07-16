import interests from '../data/interests';
import InterestPit from '../components/InterestPit';
import './Contact.css';

const Contact = () => {
    return (
        <div className="container contact">
            <p>I'm interested in</p>
            <InterestPit items={interests} />
            <p>Thinking about a project?</p> <a href="mailto:raovedh@gmail.com" className="pill pill-solid">Contact Me</a>
        </div>
    );
}

export default Contact;
