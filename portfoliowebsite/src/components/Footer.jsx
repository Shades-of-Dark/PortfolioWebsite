import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <p>Copyright  Vedh Rao - {new Date().getFullYear()}. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
