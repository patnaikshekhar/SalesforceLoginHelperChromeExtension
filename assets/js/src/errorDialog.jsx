import React from 'react'

export default class ErrorDialog extends React.Component {
    render() {
        if (this.props.children) {
            return (
                <div>
                    <div className="slds-notify slds-notify--alert slds-theme--error slds-theme--alert-texture" role="alert">
                        { this.props.children }
                    </div>
                </div>
            );
        } else {
            return <span />    
        }
    }
}