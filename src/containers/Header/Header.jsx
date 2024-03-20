import * as React from 'react';
import { motion } from 'framer-motion';

import AppWrap from "../../wrapper/AppWrap";
import { images } from '../../constants';

import './Header.scss'

/**
 * Header component
 * This is a presentation component which renders the header of the page.
 *
 * @component
 */
const Header = () => {

    /**
     * This describes the motion characteristics – such as variation in scale
     * and opacity – of the rendered element while it is in view.
     *
     * @typedef {Object} scaleVariants
     * @property {Object} whileInView
     * @property {number[]} whileInView.scale
     * @property {number[]} whileInView.opacity
     * @property {Object} whileInView.transition
     * @property {number} whileInView.transition.duration
     * @property {string} whileInView.transition.ease
     */
    const scaleVariants = {
        whileInView: {
            scale: [0,1],
            opacity: [0, 1],
            transition: {
                duration: 1,
                ease: 'easeInOut'
            }
        }
    }

    return (
        <div className="app__header app__flex">
            <motion.div
                whileInView={{x: [-100, 0], opacity: [0, 1]}}
                transition={{duration: 0.5}}
                className="app__header-info"
            >
                <div className='app__header-badge'>
                    <div className="badge-cmp app__flex">
                        <span>👋🏾</span>
                        <div style={{marginLeft: 20}}>
                            <p className="p-text"> Hi there! I'm</p>
                            <h1 className="head-text">Will</h1>
                        </div>
                    </div>
                    <div className="tag-cmp app__flex">
                        <p className="p-text">Full-stack</p>
                        <p className="p-text">Software Developer</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                whileInView={{opacity: [0, 1]}}
                transition={{duration: 0.5, delayChildren: 0.5}}
                className="app__header-img"
            >
                <img src={images.profile} alt="profile_bg" />
                <motion.img
                    whileInView={{scale: [0, 1]}}
                    transition={{duration: 1, ease: 'easeInOut'}}
                    src={images.circle}
                    alt="profile_circle"
                    className="overlay_circle"
                />
            </motion.div>

            <motion.div
                variant={scaleVariants}
                whileInView={scaleVariants.whileInView}
                className="app__header-circles"
            >
                {[images.react, images.net, images.python].map((circle, index) => (
                    <div className="circle-cmp app__flex"  key={`circle-${index}`} >
                        <img src={circle} alt="circle" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default AppWrap(Header, 'home');