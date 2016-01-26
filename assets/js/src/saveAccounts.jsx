import React from 'react';
import Store from './store';
import Helper from './helper';

let IMPORT_STATE_IGNORE = 'Ignore';
let IMPORT_STATE_OVERWRITE = 'Overwrite';
let IMPORT_STATE_CREATE = 'Create';

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
            secret: null,
            mode: 'Export'
        });
        
        Store.subscribe(this.refresh.bind(this));
        
        Store.initialize();
	}
    
    componentWillUnmount() {
        Store.unsubscribe(this.refresh.bind(this));
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
    
    openFileDialog() {
        this.refs.inputfile.click();
    }
    
    importFile(e) {
        var files = e.target.files;
                
        if (files.length > 0) {
            let file = files[0];
            
            // Get a list of existing accounts to compare
            let existingAccounts = Store.accounts.map(acc => acc.username + acc.url);
            
            let reader = new FileReader();
            
            reader.onload = (e) => {
                const jsonAccounts = JSON.parse(reader.result);
                
                const accounts = jsonAccounts.map((a) => {
                    
                    // Decode Accounts
                    if (this.state.secret) {
                        a.username = CryptoJS.TripleDES.decrypt(a.username, this.state.secret).toString(CryptoJS.enc.Utf8);
                        a.password = CryptoJS.TripleDES.decrypt(a.password, this.state.secret).toString(CryptoJS.enc.Utf8);
                    }
                    
                    var importState = null;
                    var importStates = [];
                    console.log(existingAccounts.includes(a.username + a.url), a.username, a.url, existingAccounts);
                    // Set Import State
                    if (existingAccounts.includes(a.username + a.url)) {
                        importStates = [IMPORT_STATE_IGNORE, IMPORT_STATE_OVERWRITE];
                        importState = IMPORT_STATE_IGNORE;                        
                    } else {
                        importStates = [IMPORT_STATE_CREATE, IMPORT_STATE_IGNORE];
                        importState = IMPORT_STATE_CREATE;
                    } 
                    
                    // Return the account wrapper
                    return {
                        id: a.id,
                        name: a.name,
                        selected: true,
                        account: a,
                        importState: null,
                        importStates: importStates.map(state =>
                            <option>{ state }</option> 
                        ) 
                    };    
                });
                
                // Set State of Accounts
                let state = Object.assign(this.state, {
                    accounts: accounts,
                    mode: 'Import'
                });
                
                this.setState(state);
            };
            
            reader.readAsText(file, 'utf-8');
           
        }
    }
    
    // Import the selected file
    importSelected() {
        // Filter Ignored accounts from first List
        var accountsNotIgnored = this.state.accounts
            .filter((acc) => acc.importState != IMPORT_STATE_IGNORE)
            .map((acc) => acc.account);
        
        console.log('accountsNotIgnored', accountsNotIgnored);
        
        // Delete the ones that need to be overwritten from second List
        var listOfAccountsToBeOverwritten = this.state.accounts
            .filter((acc) => acc.importState == IMPORT_STATE_OVERWRITE)
            .map((acc) => acc.account.username + acc.account.url);
        
        console.log('listOfAccountsToBeOverwritten', listOfAccountsToBeOverwritten);
            
        var originalNonDeletedAccounts = Store.accounts.filter((acc) => !listOfAccountsToBeOverwritten.includes(acc.username + acc.url))
        
        console.log('originalNonDeletedAccounts', originalNonDeletedAccounts);
        
        // Concat both lists
        var completeList = accountsNotIgnored.concat(originalNonDeletedAccounts);
        console.log('completeList', completeList);
        
        // Replace existing configuration
        Store.updateCompleteList(completeList);
        
        // Go back to Home
        this.context.history.pushState('/');
    }
    
    changeImportState(accToChange, e) {
        let newImportState = e.target.value;
        accToChange.importState = newImportState;
        
        let newState = Object.assign(this.state, {
            accounts: this.state.accounts.map(acc => acc.id == accToChange.id ? accToChange : acc)
        });
        
        this.setState(newState);
    }
    
    render() {
        const rows = this.state.accounts.map((acc) => {
            return (
                <tr className="slds-hint-parent" key={acc.id}>
                    <td>
                        { this.state.mode == 'Export' ? 
                            <label htmlFor="select-row1">
                                <input name="select-row1" type="checkbox" id="select-row1" checked={acc.selected} onChange={this.setSelected.bind(this, acc)}/>
                            </label>
                            :
                            <select value={ acc.importState } onChange={this.changeImportState.bind(this, acc)} >
                                { acc.importStates }
                            </select>
                        }
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
                                    <h2 className="slds-text-heading--small slds-truncate">{this.state.mode}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="slds-card__body">
                            <table className="slds-table slds-table--bordered">
                                <thead>
                                    <tr>
                                        { this.state.mode == 'Export' ? 
                                        <th>Selected</th>
                                        :
                                        <th>Action</th>
                                        }
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
                { this.state.mode == 'Export' ?
                <div className="slds-col slds-size--1-of-1 margin-on-top slds-col--padded">
                    <form className="slds-form--inline">
                        <div className="slds-form-element">
                            <label className="slds-form-element__label" for="Encryption">Encryption Key</label>
                            <div className="slds-form-element__control">
                                <input className="slds-input" type="text" placeholder="Optional" value={this.state.secret} onChange={this.setSecret.bind(this)} />
                            </div>
                        </div>
                        <a href={this.state.exportURL} download="export.json"><button className="slds-button slds-button--brand" type="button" onClick={this.exportAccounts.bind(this)}>Export</button></a>
                        <input type="file" onChange={this.importFile.bind(this)} className="inputfile" ref="inputfile"/>
                        <button className="slds-button slds-button--brand slight-margin-left" type="button" onClick={this.openFileDialog.bind(this)}>Import</button>
                    </form>
                </div>
                :
                <div className="slds-col slds-size--1-of-1 margin-on-top slds-col--padded">
                    <button className="slds-button slds-button--brand" type="button" onClick={this.importSelected.bind(this)}>Import Selected</button>
                </div>
                }
            </div>    
        );
    }
} 

SaveAccounts.contextTypes = {
    history: React.PropTypes.object
};
