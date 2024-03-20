import React from 'react';
import {useLocation} from "react-router-dom";
import "./NavigationDots.scss"

/**
 * NavigationDots component.
 * This component renders navigation dots.
 * The dot corresponding to the currently active section is colored differently.
 *
 * @component
 * @param {Object} props - The props object
 * @param {string} props.active - The current active section
 *
 * @example
 * <NavigationDots active='home' />
 *
 * @returns {React.Element} The rendered NavigationDots component
 */
const NavigationDots = ({active}) => {

    const location = useLocation();

    const [nav, setNav] = React.useState(["wjb-weather"]);

    React.useEffect(() => {
        if (location.pathname === '/') {
            setNav([
                'home',
                'about',
                'work',
                'skills',
                'testimonial',
                'contact'
            ]);
        }
    }, [location.pathname]);



    return (
        <div className="app__navigation">
            {nav.map((item, index) => (
                <a
                    href={`#${item}`}
                    key={item + index}
                    className='app__navigation-dot'
                    style={active === item ? { backgroundColor: '#313BAC' } : {}}
                    aria-label={`Navigate to ${item} section`} // Accessibility label
                >
                    {/* Visually hidden text for screen readers */}
                    <span className="visually-hidden">Navigate to {item} section</span>
                </a>
            ))}
        </div>
    );
}

export default NavigationDots;