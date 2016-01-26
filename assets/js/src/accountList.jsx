import React from 'react';
import Store from './store';
import AccountListItem from './accountListItem';
import ErrorDialog from './errorDialog';

class AccountList extends React.Component {

	constructor() {
		super();
	}
    
    refresh(action, accounts) {
        console.log(Store.subscribers);
        if (this) {
          if (accounts.length > 0) {
            this.setState({
			     accounts: accounts
		    });    
          } else {
            this.context.history.pushState(null, '/add/new');
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
    
    componentWillUnmount() {
        Store.unsubscribe(this.refresh);
    }
    
    error(contents, e) {
        var state = this.state;
        state['error'] = contents; 
        this.setState(state);
    }
    
	render() {
        
		let items = this.state.accounts
			.filter((acc) => {
				if (this.props.filter) {
					if (acc.name.toUpperCase().indexOf(this.props.filter.toUpperCase()) > -1) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			})
			.map((acc) => 
				<AccountListItem name={acc.name} url={acc.url} environment={acc.environment} username={acc.username} password={acc.password} key={acc.id} id={acc.id} onError={this.error.bind(this)}/> 
			);

		return (
            <div>
                <ErrorDialog>
                    { this.state.error }
                </ErrorDialog>
                
                <table className="slds-table slds-table--bordered">
                    <thead className="slds-text-heading--label">
                    </thead>
                    <tbody>
                        { items }
                    </tbody>
                </table>
            </div>
		);
	}
}

AccountList.contextTypes = {
    history: React.PropTypes.object
};

export default AccountList;