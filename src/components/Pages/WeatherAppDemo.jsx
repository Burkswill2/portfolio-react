import React from 'react';
import WeatherApp from "../../assets/Projects/Weather-App/src/WeatherApp";
import {AppWrap, MotionWrap} from "../../wrapper";
import {motion} from "framer-motion";
import './WeatherAppDemo.scss'

/**
 * Header component
 * This is a presentation component which renders the header of the page.
 *
 * @component
 */
const WeatherAppDemo = () => {

    return (
        <>
            <h2 className="head-text"> ReactJS: <span>Weather App</span></h2>
            <div className="app__weatherAppDemo">
                <motion.div
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, type: 'tween'}}
                    className="app__weatherAppDemo-item"
                >
                    <div className="demo-container">
                        <div>
                            <WeatherApp className='app__WeatherAppDemo-item'/>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}


export default AppWrap(
    MotionWrap(WeatherAppDemo, 'app__weatherAppDemo'),
    'weatherAppDemo', "app__whitebg");