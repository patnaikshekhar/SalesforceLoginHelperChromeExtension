import React from 'react';

export default class Template extends React.Component {
    render() {
        return (
            <div className="main">
                { this.props.children }
            </div>
        );
    }
}