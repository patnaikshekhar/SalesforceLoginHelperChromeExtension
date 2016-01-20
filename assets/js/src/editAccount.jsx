import React from 'react';
import Store from './store';
import { Link } from 'react-router';

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
                group: null,
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
                group: account.group,
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
        this.setState(Object.assign(this.state, newState));
    }
    
    toogleShowPassword() {
        var state = this.state;
        
        if (state.showPassword) {
            state['showPassword'] = false;
        } else {
            state['showPassword'] = true;
        }
        console.log('Here', state);
        this.setState(state);
    }
    
    saveChanges(e) {
        
        let url = this.state.environment == 'Production' ? 'https://login.salesforce.com' : (this.state.environment == 'Sandbox' ? 'https://test.salesforce.com' : this.state.url);
        
        if (this.state.id == null) {
            Store.addAccount(this.state.name, this.state.group, url, this.state.environment, this.state.username, this.state.password, this.state.token);    
        } else {
            Store.updateAccount(this.state.id, this.state.name, this.state.group, url, this.state.environment, this.state.username, this.state.password, this.state.token);
        }
        
        this.context.history.pushState('/');
    }
    
    render() {
        return (
            <div className="slds-grid slds-wrap">
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
                            <input className="slds-input" type="text" placeholder="URL" onChange={this.bindState.bind(this, 'url')} value={this.state.url}/>
                        </div>
                    </div> :
                    null }
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="username">Username</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" placeholder="Username" onChange={this.bindState.bind(this, 'username')} value={this.state.username} />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="password">Password</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type={ this.state.showPassword ? 'text' : 'password' } placeholder="Password" onChange={this.bindState.bind(this, 'password')} value={this.state.password} />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="token">Token</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type={ this.state.showPassword ? 'text' : 'password' } placeholder="Token" onChange={this.bindState.bind(this, 'token')} value={this.state.token} />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="name">Name</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" placeholder="Name" onChange={this.bindState.bind(this, 'name')} value={this.state.name} />
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" for="group">Group</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" placeholder="Group" onChange={this.bindState.bind(this, 'group')} value={this.state.group} />
                        </div>
                    </div>
                    <button className="slds-button slds-button--brand margin-on-top" onClick={this.saveChanges.bind(this)}>Save</button>
                    
                    <Link to="/">
                        <button className="slds-button slds-button--brand margin-on-top slight-margin-left">Cancel</button>
                    </Link>
                    
                    <button className="slight-margin-left slds-button slds-button--destructive margin-on-top" onClick={ this.toogleShowPassword.bind(this) }>Show Password</button>
                </div>
            </div>
        );
    }
}

EditAccount.contextTypes = {
    history: React.PropTypes.object
};

export default EditAccount;