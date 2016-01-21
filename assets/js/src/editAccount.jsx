import React from 'react';
import Store from './store';
import { Link } from 'react-router';
import ErrorDialog from './errorDialog';

class EditAccount extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
    
    componentWillMount() {
        
        let id = this.props.params.id;
        var state;
        
        if (id == 'new') {
            state = {
                id: null,
                environment: "Production",
                name: null,
                url: null,
                token: null,
                username: null,
                password: null
            };    
        } else {
            let account = Store.accounts.filter(a => a.id == id)[0];
            state = {
                id: account.id,
                environment: account.environment,
                name: account.name,
                url: account.url,
                token: account.token,
                username: account.username,
                password: account.password
            };    
        }
        
        // Set show password to false so that password is not shown by default
        state['showPassword'] = false;
        
        this.setState(state);
    }
    
    bindState(stateVar, e) {
        let newState = {};
        newState[stateVar] = e.target.value;
        
        // If the name is blank and the username is updated then update the name logically 
        if (stateVar == 'username') {
            if (newState.username.indexOf('@') > -1) {
                const parts = newState.username.split('@');
                if (parts.length > 1) {
                    var lastPart = parts[1];
                    if (lastPart.indexOf('.') > 0) {
                        newState.name = 
                            lastPart.split('.')
                            .filter(x => x != 'com')
                            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                            .join(' ');
                    } else {
                        if (lastPart.length > 1) {
                            newState.name = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);    
                        } else {
                            newState.name = lastPart;
                        }
                    }
                } 
            }
        }
        
        this.setState(Object.assign(this.state, newState));
    }
    
    // Toggle the show password state which shows the text in token and password
    toogleShowPassword() {
        var state = this.state;
        
        if (state.showPassword) {
            state['showPassword'] = false;
        } else {
            state['showPassword'] = true;
        }
        this.setState(state);
    }
    
    validate() {
        
        let state = this.state;
        
        state.error = '';
        
        if (!state.username) {
            state.error += 'Username is required. ';
        }
        
        if (!state.password) {
            state.error += 'Password is required. ';
        }
        
        if (!state.name) {
            state.error += 'Name is required.';
        }   
        
        if (state.error == '') {
            state.error = null;
            return true;    
        } else {
            state.error = <h2>{state.error}</h2>;
            this.setState(state);
            return false;
        }
        
    }
    
    saveChanges(e) {
        
        if (this.validate()) {
            let url = this.state.environment == 'Production' ? 'https://login.salesforce.com' : (this.state.environment == 'Sandbox' ? 'https://test.salesforce.com' : this.state.url);
            
            if (this.state.id == null) {
                Store.addAccount(this.state.name, url, this.state.environment, this.state.username, this.state.password, this.state.token);    
            } else {
                Store.updateAccount(this.state.id, this.state.name, url, this.state.environment, this.state.username, this.state.password, this.state.token);
                Store.updateLastAccessed(this.state.id);
            }
            
            this.context.history.pushState('/');
        }
    }
    
    render() {
        return (
            <div className="slds-grid slds-wrap">
                <div className="slds-col slds-size--1-of-1 margin-on-top slds-col--padded slds-form--stacked">
                    <ErrorDialog>
                        {this.state.error}
                    </ErrorDialog>
                </div>
		  		<div className="slds-col slds-size--1-of-1 margin-on-top slds-col--padded slds-form--stacked">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="orgType">Environment</label>
                        <div className="slds-form-element__control">
                            <div className="slds-select_container">
                                <select className="slds-select" onChange={this.bindState.bind(this, 'environment')} value={this.state.environment}>
                                    <option value='Production'>Production</option>
                                    <option value='Sandbox'>Sandbox</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    { this.state.environment == 'Other' ?
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="url">URL</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" placeholder="URL" onChange={this.bindState.bind(this, 'url')} value={this.state.url} autocomplete="off"/>
                        </div>
                    </div> :
                    null }
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="username">Username</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" placeholder="Username" onChange={this.bindState.bind(this, 'username')} value={this.state.username} autocomplete="off"/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="password">Password</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type={ this.state.showPassword ? 'text' : 'password' } placeholder="Password" onChange={this.bindState.bind(this, 'password')} value={this.state.password} autocomplete="off"/>
                        </div>
                    </div>
                    {/*<div className="slds-form-element">
                        <label className="slds-form-element__label" for="token">Token</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type={ this.state.showPassword ? 'text' : 'password' } placeholder="Token" onChange={this.bindState.bind(this, 'token')} value={this.state.token} />
                        </div>
                    </div>*/}
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="name">Name</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" placeholder="Name" onChange={this.bindState.bind(this, 'name')} value={this.state.name} autocomplete="off"/>
                        </div>
                    </div>
                    <button className="slds-button slds-button--brand margin-on-top" onClick={this.saveChanges.bind(this)}>Save</button>
                    
                    <Link to="/">
                        <button className="slds-button slds-button--brand margin-on-top slight-margin-left">Cancel</button>
                    </Link>
                    
                    <button className="slight-margin-left slds-button slds-button--destructive margin-on-top" onClick={ this.toogleShowPassword.bind(this) }>{this.state.showPassword ? 'Hide' : 'Show' } Password</button>
                </div>
            </div>
        );
    }
}

EditAccount.contextTypes = {
    history: React.PropTypes.object
};

export default EditAccount;