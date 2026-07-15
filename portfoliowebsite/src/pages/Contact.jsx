import React from 'react';
import interests from '../data/interests';
import './Contact.css';

const Contact = () => {
    return (
        <div><p>I'm interested in {interests.map((item) => (<button type='button' key={item} className='interestChip'>{item}</button>))}</p><p>Thinking about a project?</p> <a href="mailto:raovedh@gmail.com">Contact Me</a></div>
    );
}

export default Contact;