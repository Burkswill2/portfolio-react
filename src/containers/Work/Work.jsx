import React from 'react';
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import CircularProgress from '@mui/material/CircularProgress';


import {AppWrap, MotionWrap} from "../../wrapper";
import { urlFor, client } from "../../client";

import './Work.scss'
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";


/**
 * Work is a React component used to display a portfolio of works.
 * It fetches data from the client and filters it based on tags.
 * Components from the `react-icons` and `framer-motion` libraries are
 * used to display certain icons and apply animations.
 *
 * The state variables for this component are:
 * 1) activeFilter - which stores the name of the currently active work category.
 * 2) animateCard - which determines the animation to apply to the work cards.
 * 3) works - which stores all the work data fetched from the client.
 * 4) filterWork - which stores the work data that fits the active filter.
 *
 * @returns {React.Node} A component that displays portfolio works filtered by category.
 *
 * @example
 * import Work from './Work';
 *
 */
const Work = () => {

    /**
     * @type {string} activeFilter - State variable used for maintaining the active work filter category.
     */
    const [activeFilter, setActiveFilter] = React.useState('All')

    /**
     * @type {Object} animateCard - State variable used for maintaining the animation properties of work cards.
     */
    const [animateCard, setAnimateCard] = React.useState({ y: 0, opacity: 1});

    /**
     * @type {Array} works - State variable used for storing the fetched work data.
     * @type {Array} filterWork - State variable used for storing the work data based on the active filter.
     */
    const [works, setWorks] = React.useState([])
    const [filterWork, setFilterWork] = React.useState([])

    /**
     * Tracks if an error occurred while loading testimonials.
     * @type {boolean}
     */
    const [isError_works, setIsError_works] = React.useState(false);

    /**
     * Holds the error message or details for testimonials loading errors.
     * @type {string}
     */
    const [error_works, setError_works] = React.useState("");



    /**
     * @function handleWorkFilter - Function for handling the work filter functionality.
     * @param {string} item - The filter category item.
     *
     * @returns {void}
     */
    const handleWorkFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard([{y:100, opacity: 0}])

        setTimeout(() => {
            setAnimateCard([{ y: 0, opacity: 1}])

            if (item === 'All'){
                setFilterWork(works)
            } else {
                setFilterWork(works.filter((work)=> work.tags.includes(item)))
            }
        },500)
    }

    /**
     * @callback useEffect - React hook for handling side effects.
     * In this case, it fetches work data on the initial render.
     */
    React.useEffect(() => {
        const query = '*[_type == "works"]';
        client.fetch(query).then((data) => {
            setWorks(data)
            setFilterWork(data);
            setIsError_works(false)
        }).catch(error => {
            setIsError_works(true)
            setError_works(error)
        })
        }, []);

    return (
        <>
            <h2 className="head-text"> My Creative <span>Portfolio</span> Section</h2>
            <div className="app__work-filter">
                {['Java', 'Web App', 'Mobile App', 'ReactJS','All'].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <motion.div
                animate={animateCard}
                transition={{duration: 0.5, delayChildren: 0.5}}
                className="app__work-portfolio"
            >
                {works.length === 0 && <CircularProgress/>}
                {isError_works &&
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        :( Looks like something went wrong: <br/> {error_works}
                    </Alert>
                }
                {works.length && filterWork.map((work, index) => (
                    <div className="app__work-item app__flex" key={index}>
                        <div className="app__work-img app__flex">
                            <img src={urlFor(work.imgUrl)} alt={work.name} />

                            <motion.div
                                whileHover={{opacity: [0, 1]}}
                                transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
                                className="app__work-hover app__flex"
                            >
                                <a href={work.projectLink} target="_blank" rel="noreferrer">
                                    <motion.div
                                        whileInView={{scale: [0, 1]}}
                                        whileHover={{opacity: [0, 0.9]}}
                                        transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
                                        className="app__flex"
                                    >
                                        <AiFillEye/>
                                    </motion.div>
                                </a>
                                <a href={work.codeLink} target="_blank" rel="noreferrer">
                                    <motion.div
                                        whileInView={{scale: [0, 1]}}
                                        whileHover={{opacity: [0, 0.9]}}
                                        transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
                                        className="app__flex"
                                    >
                                        <AiFillGithub/>
                                    </motion.div>
                                </a>

                            </motion.div>
                        </div>

                        <div className="app__work-content app__flex">
                            <h4 className="bold-text">{work.title}</h4>
                            <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

                            <div className="app__work-tag app__flex">
                                <p className="p-text">{work.tags[0]}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </motion.div>

        </>
    );
}

export default AppWrap(
    MotionWrap(Work, 'app__work'),
    'work', "app__primarybg");