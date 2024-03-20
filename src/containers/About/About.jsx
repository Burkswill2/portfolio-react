import React from 'react';
import {motion} from "framer-motion";
import { urlFor, client } from '../../client'
import {AppWrap, MotionWrap} from "../../wrapper";

import './About.scss'

/**
 * About component fetches and displays data type "abouts" from the client.
 * It uses the Framer Motion library to apply view and hover animations on the profile items.
 *
 * @returns {React.Node} A React component to render the 'About' section of the application that consists of motion-enabled profile items.
 * Each profile consists of an image, title, and description. The 'About' section is enclosed under AppWrap for additional context.
 *
 */
const About = () => {

    /**
     * A state variable, `abouts`, is created and the setter method `setAbouts` is defined.
     * Initially, `abouts` is an empty array.
     */
    const [abouts, setAbouts] = React.useState([])

    /**
     * `Runs after every rendering.
     *
     * The effect is fetching data of type 'abouts' from the client and
     * updating the state variable `abouts` with the fetched data.
     *
     * @type {Array} abouts - An array state variable used to store the data fetched from the client.
     * @type {function} setAbouts - Function used to update the state variable abouts.
     */
    React.useEffect(() => {
        const query = '*[_type == "abouts"]';
        //Todo: Add proper error handling
        client.fetch(query).then((data) => {
            setAbouts(data);
            }
        )
    }, []);

    return (
        <>
            <h2 className="head-text"> Creating <span>seamless experiences</span> <br /> and <span>relevant solutions </span> </h2>
            <div className="app__profiles">
                {abouts.map((about, index)=> (
                    <motion.div
                        whileInView={{opacity: 1}}
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.5, type: 'tween'}}
                        className="app__profile-item"
                        key={about.title + index}
                    >
                        <img src={urlFor(about.imgUrl)} alt={about.title}/>
                        <h2 className="bold-text" style={{marginTop: 20}}>{about.title}</h2>
                        <p className="p" style={{marginTop: 10}}>{about.description}</p>
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export default AppWrap(
    MotionWrap(About, 'app__about'),
    'about', "app__whitebg");