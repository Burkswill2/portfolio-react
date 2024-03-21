import React from 'react';
import {images} from '../../constants';
import {AppWrap, MotionWrap} from "../../wrapper";
import {client} from "../../client";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

import './Footer.scss'

const Footer = () => {

    const [isError_contact, setIsError_contact] = React.useState(false)

    const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

    const [loading, setLoading] = React.useState(false);


    const createContact = (formData) => {
        console.log("marker")

        const contact = {
            _type: 'contact',
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
        }
        client.create(contact)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
                setIsError_contact(false);
            }).catch((error) => {
                console.log(error)
            setIsError_contact(true);
            setLoading(false);
            setIsFormSubmitted(false);
        })
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
        message: Yup.string().max(500).required()
    });


    return (
        <>
            <h2
                className="head-text"
                style={{color: "#000"}}
            > Take a Coffee <span>&</span> Chat With Me</h2>
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
                <>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            message: '',
                        }}
                        validationSchema={contactSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {
                                setSubmitting(false)
                                console.log(values);
                                setLoading(true);
                                createContact(values)
                            }, 400)
                        }}
                    >
                        {({handleSubmit, isSubmitting, errors, touched}) => (
                            <Form onSubmit={handleSubmit}
                                  className="app__footer-form app__flex">
                                <div className="app__flex">
                                    <Field name="firstName"
                                           id="fistName"
                                           className="p-text"
                                           placeholder="Your First Name"
                                    />
                                    {errors.firstName && touched.firstName ? (
                                        <div className="e-text app__flex">{errors.firstName}</div>
                                    ) : null}
                                </div>
                                <div className="app__flex">
                                    <Field name="lastName"
                                           id="lastName"
                                           className="p-text"
                                           placeholder="Your Last Name"
                                    />
                                    {errors.lastName && touched.lastName ? (
                                        <div className="e-text app__flex" >{errors.lastName}</div>
                                    ) : null}
                                </div>
                                <div className="app__flex">
                                    <Field name="email"
                                           id="email"
                                           className="p-text"
                                           placeholder="Your Email"
                                    />
                                    {errors.email && touched.email ? (
                                        <div className="e-text app__flex" >{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="app__flex">
                                    <Field name="phone"
                                           id="phone"
                                           className="p-text"
                                           placeholder="Your Phone Number (Optional)"
                                    />
                                    {errors.phone && touched.phone ? (
                                        <div className="e-text app__flex">{errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className="app__flex">
                                    <Field
                                        name="message"
                                        id="message"
                                        className="p-text"
                                        placeholder="Leave a message"
                                        component="textarea" rows="4"
                                    />
                                    {errors.message && touched.message ? (
                                        <div className="e-text app__flex">{errors.message}</div>
                                    ) : null}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="p-text"
                                >{loading ? 'Sending' : 'Send Message'}
                                </button>
                            </Form>
                        )}

                    </Formik>
                </>

                :
                <>
                    {!isError_contact &&
                        <div>
                            <h3 className="head-text">Thank you for getting in touch!</h3>
                        </div>
                    }
                    {isError_contact &&
                        <div>
                            <h3 className="head-text">⚠️ Something didn't go right. <br/> Let's still get in touch. Click an icon!</h3>
                        </div>
                    }
                </>

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