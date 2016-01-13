import React from 'react';
import ReactDOM from 'react-dom';
import AccountList from './accountList';
import Store from './store';
import Helper from './helper'

class App extends React.Component {
	
	componentWillMount() {
		this.i = 0;
		this.setState({
			filter: ''
		});
	}

	addAccount() {
		Store.addAccount('Test' + this.i, 'A', 'http://login.salesforce.com', 'patnaikshekhar@wave.com', 'shepat9871');
		this.i += 1;

		if (this.i > 4) {
			this.i = 0;
		}
        
        Helper.openWindow('http://login.salesforce.com', 'patnaikshekhar@wave.com', 'shepat9871');
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
		  		<nav className="slds-col slds-size--1-of-1">
		  			<div className="slds-col slds-size--1-of-2">
		    			<button className="slds--button" onClick={this.addAccount.bind(this)}>Add Account</button>
		    		</div>
		    		<div className="slds-col slds-size--1-of-2">
		    			<input type="text" placeholder="Search.." onChange={this.filterResults.bind(this)} />
		    		</div>
		  		</nav>
		  		<div className="slds-col slds-size--1-of-1">
		  			<AccountList filter={ this.state.filter }/>
		  		</div>
		  		<div className="slds-col slds-size--1-of-1">
		  			Hello
		  		</div>
			</div>
		);
	}
}

export default App;