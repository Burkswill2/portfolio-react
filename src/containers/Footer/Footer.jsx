import React from 'react';
import { images } from '../../constants';
import {AppWrap, MotionWrap} from "../../wrapper";
import { client } from "../../client";

import './Footer.scss'

const Footer = () => {

    const [formData, setFormData] = React.useState({
        name: "" ,
        email: "",
        message: "",
    })

    const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const {
        name,
        email,
        message,
    } = formData;

    const handleSubmit = () => {
        setLoading(true);

        const contact = {
            _type: 'contact',
            name: name,
            email: email,
            message: message,
        }
        client.create(contact)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            })
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }


    return (
        <>
            <h2 className="head-text"> Take a Coffee <span>&</span> Chat With Me</h2>
            <div className="app__footer-cards">
                <div className="app__footer-card">
                    <img src={images.email} alt="email"/>
                    <a href="mailto:burkswill2@gmail.com" className="p-text">will@wjb.dev</a>
                </div>
                <div className="app__footer-card">
                    <img src={images.mobile} alt="mobile"/>
                    <a href="tel:+1 (949) 842-7089" className="p-text">+1(949) 842-7089</a>
                </div>
            </div>
            {!isFormSubmitted ?
                <div className="app__footer-form app__flex">
                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Your Name" name="name" value={name}
                               onChange={handleChangeInput}/>
                    </div>

                    <div className="app__flex">
                        <input className="p-text" type="email" placeholder="Your Email" name="email" value={email}
                               onChange={handleChangeInput}/>
                    </div>
                    <div>
                    <textarea
                        className="p-text"
                        placeholder="Your Message"
                        value={message}
                        name="message"
                        onChange={handleChangeInput}
                    />
                    </div>
                    <button
                        type="button"
                        className="p-text"
                        onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}
                    </button>
                </div>
                :
                <div>
                    <h3 className="head-text">Thank you for getting in touch!</h3>
                </div>
            }

        </>
    );
}

export default AppWrap(
    MotionWrap(Footer, 'app__footer'),
    'contact',
    'app__whitebg',
);