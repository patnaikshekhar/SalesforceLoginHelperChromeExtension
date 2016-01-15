import React from 'react';

export default class Template extends React.Component {
    render() {
        return (
            <div className="slds main">
                { this.props.children }
            </div>
        );
    }
}