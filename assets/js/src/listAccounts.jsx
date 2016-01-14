import React from 'react';
import AccountList from './accountList';
import Store from './store';
import { Link } from 'react-router';

class ListAccounts extends React.Component {
	
	componentWillMount() {
		this.i = 0;
		this.setState({
			filter: ''
		});
	}

	addAccount() {
		Store.addAccount('Test' + this.i, 'A', 'http://login.salesforce.com', 'patnaikshekhar@wave.com', 'shepat9871');
	}

	filterResults(e) {
		let value = e.target.value;

		this.setState({
			filter: value
		});
	}

	render() {
		return (
			<div className="slds-grid slds-wrap">
		  		<nav className="slds-col slds-size--1-of-1 margin-on-top slds-col--padded">
                    <div className="slds-grid">
                        <div className="slds-col slds-size--4-of-6">
                            <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right">
                                <svg aria-hidden="true" className="slds-input__icon">
                                    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
                                </svg>
                                <input placeholder="Search.." onChange={this.filterResults.bind(this)} className="slds-input" type="text" />
                            </div>
                        </div>
                        <div className="slds-col slds-size--1-of-6 slds-col--padded">
                           <Link to={ '/add' }>
		    			       <button className="slds-button slds-button--brand" onClick={this.addAccount.bind(this)}>Add Account</button>
                           </Link>
		    		    </div>
                    </div>
		  		</nav>
		  		<div className="slds-col slds-size--1-of-1 margin-on-top">
		  			<AccountList filter={ this.state.filter }/>
		  		</div>
		  		<div className="slds-col slds-size--1-of-1">
		  			
		  		</div>
			</div>
		);
	}
}

export default ListAccounts;