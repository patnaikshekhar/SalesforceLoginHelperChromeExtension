import React from 'react';
import AccountList from './accountList';
import Store from './store';
import { Link } from 'react-router';

class ListAccounts extends React.Component {
	
	componentWillMount() {
		this.setState({
			filter: ''
		});
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
                                <input placeholder="Search.." onChange={this.filterResults.bind(this)} className="slds-input search-input" type="text" />
                            </div>
                        </div>
                        <div className="slds-col slds-size--1-of-6 slds-col--padded">
                           <Link to="/add/new">
		    			       <button className="slds-button slds-button--brand">
                                <span>
                                    <svg aria-hidden="true" className="slds-button__icon--stateful slds-button__icon--left">
                                    <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
                                </svg>Add Org</span>
                               </button>
                           </Link>
		    		    </div>
                    </div>
		  		</nav>
		  		<div className="slds-col slds-size--1-of-1 margin-on-top accountlist">
		  			<AccountList filter={ this.state.filter }/>
		  		</div>
			</div>
		);
	}
}

export default ListAccounts;