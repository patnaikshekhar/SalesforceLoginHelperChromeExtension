class Account {
	constructor(id, name, group, url, environment, username, password, token) {
        this.id = id;
		this.name = name;
		this.group = group;
		this.url = url;
        this.environment = environment;
		this.username = username;
		this.password = password;
        this.token = token;
	}
}

export var ACTION_CHANGED = 'changed';

var index = 0;

export default {
	
	accounts: [],
    // new Account('UAT', 'Syngenta', 'https://login.salesforce.com', 'test', 'test', ''),
    //     new Account('FR Test', 'Syngenta', 'https://login.salesforce.com', 'test', 'test', '')
    
    getLastIndex: function() {
        index += 1
        return index;
    },
    
	subscribers: [],

	addAccount(name, group, url, environment, username, password, token) {
		this.accounts.push(
			new Account(this.getLastIndex(), name, group, url, environment, username, password, token)
		);

		this.dispatch(ACTION_CHANGED, this.accounts);
		return true;
	},
    
    updateAccount(id, name, group, url, environment, username, password, token) {
        
        let account = this.accounts.filter(account => id == account.id)[0];
        account.name = name;
        account.group = group;
        account.url = url;
        account.environment = environment;
        account.username = username;
        account.password = password;
        account.token = token;
        
		this.dispatch(ACTION_CHANGED, this.accounts);
		return true;
	},
    
    deleteAccount(id) {
        this.accounts = this.accounts.filter(account => id != account.id);
        this.dispatch(ACTION_CHANGED, this.accounts);
    },
    
    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter((c) => c != callback);
    },
    
	subscribe(callback) {
		this.subscribers.push(callback);
	},

	dispatch(action, obj) {
		this.subscribers.forEach((callback) => callback(action, obj))
	}
};