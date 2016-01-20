import React from 'react'

export default class ErrorDialog extends React.Component {
    render() {
        if (this.props.message) {
            return (
                <div>
                    <div className="slds-notify slds-notify--alert slds-theme--error slds-theme--alert-texture" role="alert">
                        <h2>{ this.props.message }</h2>
                    </div>
                </div>
            );
        } else {
            return <span />    
        }
    }
}