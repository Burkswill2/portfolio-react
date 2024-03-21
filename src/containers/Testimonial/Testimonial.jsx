import React from 'react';
import { motion } from "framer-motion";
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import {AppWrap, MotionWrap} from "../../wrapper";
import { urlFor, client } from "../../client";
import AlertTitle from '@mui/material/AlertTitle';


import './Testimonial.scss';
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * `Testimonial` is a React component that displays a list of testimonials and brands.
 * It fetches testimonial and brand data from a remote source and renders each in a carousel-type display.
 * The component uses React hooks for managing state and side effects.
 *
 * The state variables for this component are:
 * 1) `testimonials` - Stores the list of all testimonials fetched from the remote server.
 * 2) `brands` - Stores the list of all brands fetched from the server.
 * 3) `currentIndex` - An index for the currently displayed testimonial.
 *
 * Several external libraries such as `react-icons` and `framer-motion` are used in
 * this component for handling animations and displaying icons. Customized styles are included from `Testimonial.scss`.
 *
 * @returns {React.Node} The `Testimonial` component that displays a list of testimonials
 * and brands in a carousel-like UI.
 *
 */
const Testimonial = () => {

    /**
     * @type {Array} testimonials - State variable used for storing the fetched testimonials' data.
     * @type {Array} brands - State variable used for storing the brands' data.
     */
    const [testimonials, setTestimonials] = React.useState([]);
    const [brands, setBrands] = React.useState([]);

    /**
     * @type {string} currentIndex - State variable used for managing the current testimonials index.
     */
    const [currentIndex, setCurrentIndex] = React.useState(0)

    /**
     * Tracks if an error occurred while loading testimonials.
     * @type {boolean}
     */
    const [isError_testimonials, setIsError_testimonials] = React.useState(false);

    /**
     * Holds the error message or details for testimonials loading errors.
     * @type {string}
     */
    const [error_testimonials, setError_testimonials] = React.useState("");

    /**
     * Tracks if an error occurred while loading brands.
     * @type {boolean}
     */
    const [isError_brands, setIsError_brands] = React.useState(false);

    /**
     * Holds the error message or details for brands loading errors.
     * @type {string}
     */
    const [error_brands, setError_brands] = React.useState("");


    /**
     * @callback useEffect - React hook for handling side effects.
     * In this case, it fetches testimonials and brands data on the initial render.
     */
    React.useEffect(() => {
        const query_testimonials = '*[_type == "testimonials"]'
        const query_brands = '*[_type == "brands"]'

        client.fetch(query_testimonials)
            .then((data) => {
            setTestimonials(data);
            setIsError_testimonials(false)

            }).catch((error) => {
            setIsError_testimonials(true)
            setError_testimonials(error)
        })

        client.fetch(query_brands)
            .then((data) => {
                setBrands(data);
                setIsError_brands(false)
            }).catch((error) => {
            setIsError_brands(true)
            setError_brands(error)

        })
    },[])



    /**
     * @function handleClick - Function for handling the work filter functionality.
     * @param {string} direction - The direction indicator string category item.
     *
     * @returns {void}
     */
    const handleClick = (direction) => {
        switch (direction) {
            case 'left':
                setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
                break;
            case 'right':
                setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
                break;
            default: setCurrentIndex(currentIndex)
        }
    }
    /**
     * `testimonial` object stores the currently displayed testimonial data.
     * It retrieves the testimonial data from the `testimonials` array
     * using `currentIndex` as the index. If `testimonials[currentIndex]` doesn't
     * exist, `testimonial` will be undefined.
     *
     * @type {Object|undefined} The testimonial object or undefined.
     */
    const testimonial = testimonials[currentIndex] ?? undefined;

    return (
        <>
            {testimonials.length === 0 && <CircularProgress/>}
            {isError_testimonials &&
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    :( Looks like something went wrong: <br/> {error_testimonials}
                </Alert>
            }
            {testimonials.length &&
                <>
                    <motion.div
                        className="app__testimonial-item app__flex"
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src={urlFor(testimonial.imageurl)} alt="testimonials" />
                        <div className="app__testimonial-content" >
                            <p className="p-text"> {testimonial.feedback}</p>
                            <div>
                                <h4 className="bold-text">{testimonial.name}</h4>
                                <h5 className="p-text">{testimonial.company}</h5>
                            </div>
                        </div>
                    </motion.div>
                    <div className="app__testimonial-btns app__flex">
                        <div className="app__flex" onClick={() => handleClick('left')}>
                            <HiChevronLeft/>
                        </div>

                        <div className="app__flex" onClick={() => handleClick('right')}>
                            <HiChevronRight/>
                        </div>
                    </div>
                </>
            }
            {brands.length === 0 && <CircularProgress/>}
            {isError_brands &&
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                :( Looks like something went wrong: <br/> {error_brands}
            </Alert>
            }
            {brands.length &&
                <div className="app__testimonials-brands app__flex">
                    {brands.map((brand, index) => (
                        <motion.div
                            whileInView={{opacity: [0, 1]}}
                            transition={{duration: 0.5, type: 'tween'}}
                            key={`${brand.name}-${index}`}
                        >
                            <img src={urlFor(brand.imgUrl)} alt={brand.name}/>
                        </motion.div>
                    ))}
                </div>
            }
        </>
    );
}

export default AppWrap(
    MotionWrap(Testimonial, 'app__testimonial'),
    'testimonial',
    'app__gray2wht',
);