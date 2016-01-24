import React from 'react';
import Store from './store';

export default class SaveAccounts extends React.Component {
    
    refresh(action, accounts) {
        if (this) {
          if (accounts.length > 0) {
            this.setState({
			     accounts: accounts
		    });    
          }
        }
    }
    
	componentWillMount() {
        
        this.setState({
            accounts: []
        });
        
        Store.subscribe(this.refresh.bind(this));
        
        Store.initialize();
	}
    
    render() {
        const rows = this.state.accounts.map((acc) => {
            return (
                <tr class="slds-hint-parent">
                    <label class="slds-checkbox" for="select-row1">
                        <input name="select-row1" type="checkbox" id="select-row1" />
                        <td data-label="account"><a href="#" class="slds-truncate">{ acc.name }</a></td>
                    </label>
                </tr>    
            );
        }); 
        
        return (
            <div className="slds-grid slds-wrap">
                <div className="slds-col slds-size--1-of-1 margin-on-top slds-col--padded">
                    <form className="slds-form--inline">
                        <div className="slds-form-element">
                            <label className="slds-form-element__label" for="Encryption">Encryption Key</label>
                            <div className="slds-form-element__control">
                                <input className="slds-input" type="text" placeholder="Encryption Key" />
                            </div>
                        </div>
                        <button className="slds-button slds-button--brand" type="button">Export</button>
                        <button className="slds-button slds-button--brand" type="button">Import</button>
                    </form>
                </div>
                <div className="slds-col slds-size--1-of-1 margin-on-top slds-col--padded">
                    <table className="slds-table slds-table--bordered">
                        <tbody>
                            { rows }
                        </tbody>
                    </table>
                </div>
            </div>    
        );
    }
} 