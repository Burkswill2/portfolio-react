import React from 'react';
//WrappedComponent, additionalProps
//                <div className="stage-container" {...additionalProps}>
const Stage = () => {
    // This is the HOC that wraps around your project component
    return class extends React.Component {
        render() {
            return (
                <div className="stage-container">
                    <h1>Stage</h1>
                    {/*<WrappedComponent {...this.props} />*/}
                </div>
            );
        }
    };
};

export default Stage;