import React from 'react';
import Store from './store';
import AccountListItem from './accountListItem';

export default class AccountList extends React.Component {

	constructor() {
		super();
	}
    
    refresh(action, accounts) {
        console.log('Refresh', accounts);
        if (this) {
          this.setState({
			accounts: accounts
		  });    
        }
    }
    
	componentWillMount() {
        
        this.setState({
            accounts: []
        });
        
        Store.subscribe(this.refresh.bind(this));
        
        Store.initialize();
	}
    
    componentWillUnmount() {
        Store.unsubscribe(this.refresh.bind(this));
    }
    
	render() {
		console.log(this.state.accounts);
        
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
				<AccountListItem name={acc.name} group={acc.group} url={acc.url} environment={acc.environment} username={acc.username} password={acc.password} key={acc.id} id={acc.id} /> 
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