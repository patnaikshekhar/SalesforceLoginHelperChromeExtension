import React from 'react';
import Store from './store';
import Helper from './helper';

export default class SaveAccounts extends React.Component {
    
    refresh(action, accounts) {
        if (this) {
          if (accounts.length > 0) {
            let state = this.state;
            
            state.accounts = accounts.map((acc) => {
                return {
                    id: acc.id,
                    name: acc.name,
                    selected: true,
                    account: acc    
                }
            });
            
            this.setState(state);    
          }
        }
    }
    
	componentWillMount() {
        
        this.setState({
            accounts: [],
            secret: null
        });
        
        Store.subscribe(this.refresh.bind(this));
        
        Store.initialize();
	}
    
    // Sets the state when the checkbox is clicked
    setSelected(selectedAccount, e) {
        const state = this.state.accounts.map((acc) => {
            
            if (selectedAccount.id == acc.id) {
                if (acc.selected) {
                    acc.selected = false;    
                } else {
                    acc.selected = true;
                }    
            }
            
            return acc;
        });
        
        this.setState(state);
    }
    
    // Set Secret
    setSecret(e) {
        let secret = e.target.value;
        if (secret == '') {
            secret = null;
        }
        
        let state = this.state;
        state.secret = secret;
        this.setState(state);
    }
    
    // Exports the selected account to disk
    exportAccounts() {
        let secret = this.state.secret;
        
        Helper.download(
            this.state.accounts
                .filter((acc) => acc.selected)
                .map((acc) => {
                    if (secret) {
                        acc.account.username = CryptoJS.TripleDES.encrypt(acc.account.username, secret).toString();
                        acc.account.password = CryptoJS.TripleDES.encrypt(acc.account.password, secret).toString();    
                    }
                    
                    return acc.account;
                })
        );
        
        this.context.history.pushState('/');
    }
    
    render() {
        const rows = this.state.accounts.map((acc) => {
            return (
                <tr className="slds-hint-parent" key={acc.id}>
                    <td>
                        <label for="select-row1">
                            <input name="select-row1" type="checkbox" id="select-row1" checked={acc.selected} onChange={this.setSelected.bind(this, acc)}/>
                        </label>
                    </td>
                    <td>{ acc.name }</td>
                </tr>    
            );
        }); 
        
        return (
            <div className="slds-grid slds-wrap">
                <div className="slds-col slds-size--1-of-1 margin-on-top slds-col--padded">
                    <div className="slds-card">
                        <div className="slds-card__header slds-grid">
                            <div className="slds-media slds-media--center slds-has-flexi-truncate">
                            <div className="slds-media__figure">
                                <svg aria-hidden="true" className="slds-icon slds-icon-standard-contact slds-icon--small">
                                    <use xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#contact"></use>
                                </svg>
                            </div>
                            <div className="slds-media__body">
                                <h2 className="slds-text-heading--small slds-truncate">Export</h2>
                            </div>
                            </div>
                        </div>
                        <div className="slds-card__body">
                            <table className="slds-table slds-table--bordered">
                                <thead>
                                    <tr>
                                        <th>Selected</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { rows }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="slds-col slds-size--1-of-1 margin-on-top slds-col--padded">
                    <form className="slds-form--inline">
                        <div className="slds-form-element">
                            <label className="slds-form-element__label" for="Encryption">Encryption Key</label>
                            <div className="slds-form-element__control">
                                <input className="slds-input" type="text" placeholder="Optional" value={this.state.secret} onChange={this.setSecret.bind(this)} />
                            </div>
                        </div>
                        <a href={this.state.exportURL} download="export.json"><button className="slds-button slds-button--brand" type="button" onClick={this.exportAccounts.bind(this)}>Export</button></a>
                        <button className="slds-button slds-button--brand" type="button">Import</button>
                    </form>
                </div>
            </div>    
        );
    }
} 

SaveAccounts.contextTypes = {
    history: React.PropTypes.object
};
