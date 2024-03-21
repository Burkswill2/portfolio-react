import React from 'react';
import { motion } from "framer-motion";
import Tooltip from '@mui/material/Tooltip';
import {AppWrap, MotionWrap} from "../../wrapper";
import { urlFor, client } from "../../client";

import './Skills.scss'
import { Fade } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


/**
 * Skills Component
 *
 * This component fetches skills and experiences data from a client and displays it by each work and each year of experience.
 * It uses motion from framer-motion library for animations.
 * It uses Tooltip from @mui/material library to show the description of work when hovering over its name.
 *
 * @component
 *
 */
const Skills = () => {

    /**
     * @type {Array} experience - State variable used for storing the fetched experience data.
     * @type {Array} skills - State variable used for storing the skills.
     */
    const [experience, setExperience] = React.useState([]);
    const [skills, setSkills] = React.useState([]);

    /**
     * Tracks if an error occurred while loading skills.
     * @type {boolean}
     */
    const [isError_skills, setIsError_skills] = React.useState(false);

    /**
     * Holds the error message or details for skills loading errors.
     * @type {string}
     */
    const [error_skills, setError_skills] = React.useState("");

    /**
     * Tracks if an error occurred while loading experiences.
     * @type {boolean}
     */
    const [isError_exp, setIsError_exp] = React.useState(false);

    /**
     * Holds the error message or details for experiences loading errors.
     * @type {string}
     */
    const [error_exp, setError_exp] = React.useState("");



    /**
     * @callback useEffect - React hook for handling side effects.
     * In this case, it fetches skills and experiences data on the initial render.
     */
    React.useEffect(() => {
        const query_experiences = '*[_type == "experiences"]';
        const query_skills = '*[_type == "skills"]';

        client.fetch(query_experiences).then((data) => {
            setExperience(data);
            setIsError_exp(false)
        }).catch((error)=>{
            setIsError_exp(true)
            setError_exp(error)

        })

        client.fetch(query_skills).then((data) => {
            setSkills(data);
            setIsError_skills(false)
        }).catch((error)=> {
            setIsError_skills(true)
            setError_skills(error)
        })
    }, []);

    function compare(a, b) {
        const expA = a.year
        const expB = b.year
        let comparator = 0

        if (expA < expB) comparator = 1
        else if (expA > expB) comparator = -1
        return comparator
    }

    return (
        <>
            <h2 className="head-text">Skills & Experience</h2>
            <div className="app__skills-container">
                <motion.div className="app__skills-list">
                    {skills.length === 0 && <CircularProgress/>}
                    {isError_skills &&
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            :( Looks like something went wrong: <br/> {error_skills}
                        </Alert>
                    }
                    {skills.length && skills.map((skill) => (
                        <motion.div
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                            className="app__skills-item app__flex"
                            key={skill.name}
                        >
                            <div className="app__flex" style={{ backgroundColor: skill.bgColor }} >
                                <img src={urlFor(skill.icon)} alt={skill.name} />
                            </div>
                            <p className="p-text">{skill.name}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div className="app__skills-exp">
                    {experience.length === 0 && <CircularProgress/>}
                    {isError_exp &&
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            :( Looks like something went wrong: <br/> {error_exp}
                        </Alert>
                    }
                    {experience.length && experience.sort(compare).map((exp, index) => (
                            <motion.div
                                className="app__skills-exp-item"
                                key={`${exp.year}-${index}`}
                            >
                                <div className="app__skills-exp-year">
                                    <p className="bold.text" >{exp.year}</p>
                                </div>
                                {/*{console.log('Skills:', {exp})}*/}
                                <motion.div className="app__skills-exp-works">
                                    {exp.works.map((work, index) => (
                                        <React.Fragment
                                            key={`${exp.year}-${work.name}-${index}`}
                                        >
                                            <motion.div
                                                whileInView={{opacity: [0, 1]}}
                                                transition={{duration: 0.5}}
                                                className="app__skills-exp-work app__flex"
                                                data-tip
                                                data-for={work.name}
                                            >

                                                <Tooltip
                                                    id={work.name}
                                                    title={work.desc}
                                                    TransitionComponent={Fade}
                                                    TransitionProps={{ timeout: 600 }}
                                                    placement='right'
                                                    arrow={true}
                                                    componentsProps={{
                                                        tooltip: {
                                                            sx: {
                                                                '& .MuiTooltip-arrow': {color: 'var(--white-color)'},
                                                                backgroundColor: 'var(--white-color)',
                                                                maxWidth: '300px',
                                                                boxShadow: '0 0 25px rgba(0,0,0,0.1)',
                                                                borderRadius: '5px',
                                                                padding: '1rem',
                                                                color: 'var(--gray-color)',
                                                                textAlign: 'center',
                                                                lineHeight: '1.5',
                                                                opacity: '1',
                                                                // eslint-disable-next-line no-useless-computed-key
                                                                ["@media screen and (min-width: 2000px)"]: {
                                                                    fontSize: '1.75rem',
                                                                    maxWidth: '500px',
                                                                    lineHeight: '2',
                                                                }
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <h4 className="bold-text">{work.name}</h4>
                                                </Tooltip>
                                                <p className="p-text">{work.company}</p>
                                            </motion.div>
                                        </React.Fragment>
                                    ))}
                                </motion.div>
                            </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
}

export default AppWrap(
    MotionWrap(Skills, 'app__skills'),
    'skills', "app__blk2blue");