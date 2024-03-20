import React from 'react';
import { SocialIcon } from 'react-social-icons'
import "./SocialMedia.scss"

/**
 * SocialMedia component.
 * This component displays social media icons for Twitter, Instagram, and Facebook.
 *
 * @component
 * @example
 * <SocialMedia />
 *
 * @returns {React.Element} The rendered SocialMedia component
 */
const SocialMedia = () => {

    const [iconStyle, setIconStyle] = React.useState({ width: 50, height: 50 });

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 2000) {
                setIconStyle({ width: 25, height: 25 });
            } else {
                setIconStyle({ width: 50, height: 50 });
            }
        };

        // Set the initial size
        handleResize();

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="app__social" >
            <div>
                <SocialIcon className="app__social-icon" target="_blank" rel="noopener noreferrer" url="https://www.github.com/Burkswill2" style={iconStyle} />
            </div>
            <div>
                <SocialIcon className="app__social-icon" target="_blank" rel="noopener noreferrer" url="https://www.linkedin.com/in/william-burks-ii/" style={iconStyle}/>
            </div>
        </div>
    );
}

export default SocialMedia;