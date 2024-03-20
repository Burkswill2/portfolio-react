import React from 'react';
import SocialMedia from "../components/Social Media/SocialMedia";
import NavigationDots from "../components/Navigation Dots/NavigationDots";


/**
 * Higher Order Component that wraps a given component.
 * Creates a container with an ID, custom classNames, social media section,
 * wrapped component, copyright information, and navigation dots.
 *
 * @param {React.Component} Component - The component to be wrapped.
 * @param {string} idName - The ID for the container element.
 * @param {string} classNames - Additional classNames to be added to the container element.
 * @returns {function} - Higher Order Component
 */
const AppWrap = (Component, idName, classNames) => function HOC() {
    return (
        <div id={idName} className={`app__container ${classNames}`}>
            <SocialMedia />
            <div className={"app__wrapper app__flex"} >
                <Component />
                <div className="copyright">
                    <p className="p-text">@2024 WJB.DEV</p>
                    <p className="p-text">All rights reserved</p>
                </div>
            </div>
            <NavigationDots active={idName} />
        </div>
    );
}

export default AppWrap;
