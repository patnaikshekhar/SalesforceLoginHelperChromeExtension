import React from 'react';
import Store from './store';
import AccountListItem from './accountListItem';

export default class AccountList extends React.Component {

	constructor() {
		super();
	}

	componentWillMount() {
		this.setState({
			accounts: Store.accounts
		});

		Store.subscribe((action, accounts) => this.setState({
			accounts: accounts
		}));
	}

	render() {
		
		let items = this.state.accounts
			.filter((acc) => {
				if (this.props.filter) {
					if (acc.name.indexOf(this.props.filter) > -1) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			})
			.map((acc) => 
				<AccountListItem name={acc.name} url={acc.url} username={acc.username} password={acc.password} /> 
			);

		return (
			<table className="slds-table slds-table--bordered">
				<thead className="slds-text-heading--label">
				</thead>
				<tbody>
					{ items }
				</tbody>
			</table>
		);
	}
}