import React from 'react';
import {images} from '../../constants';
import {AppWrap, MotionWrap} from "../../wrapper";
import {client} from "../../client";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

import './Footer.scss'

const Footer = () => {

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    })

    const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const {
        firstName,
        lastName,
        email,
        phone,
        message,
    } = formData;

    const handleSubmit = () => {
        setLoading(true);

        const contact = {
            _type: 'contact',
            fistName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            message: message,
        }
        client.create(contact)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            }).catch((error) => {

        })
    }

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }


    const contactSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        phone: Yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),
        message: Yup.string().max(255)
    });


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
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        message: '',
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values);
                        setSubmitting(false);
                        console.log(values);
                    }}
                >
                    {({errors, touched}) => (
                        <Form
                            className="app__footer-form app__flex">
                            <div className="app__flex">
                                <input name="firstName"
                                       className="p-text"
                                       placeholder="Your First Name"

                                />
                                {errors.firstName && touched.firstName ? (
                                    <div>{errors.firstName}</div>
                                ) : null}
                            </div>
                            <div className="app__flex">
                                <Field name="lastName"
                                       className="p-text"
                                       placeholder="Your Last Name"
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div>{errors.lastame}</div>
                                ) : null}
                            </div>
                            <div className="app__flex">
                                <Field name="email"
                                       className="p-text"
                                       placeholder="Your Email"
                                />
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                            </div>
                            <div className="app__flex">
                                <Field
                                    name="message"
                                    className="p-text"
                                    placeholder="Leave a message"
                                    component="textarea" rows="4" value={""}
                                />
                            </div>
                            <button
                                type="submit"
                                className="p-text"
                                disabled={isSubmitting}
                            >{loading ? 'Sending' : 'Send Message'}
                            </button>
                        </Form>
                    )}

                </Formik>
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
)
;