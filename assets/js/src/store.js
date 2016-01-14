class Account {
	constructor(name, group, url, username, password) {
		this.name = name;
		this.group = group;
		this.url = url;
		this.username = username;
		this.password = password;
	}
}

export var ACTION_CHANGED = 'changed';

export default {
	
	accounts: [
        new Account('UAT', 'Syngenta', 'https://login.salesforce.com', 'test', 'test'),
        new Account('FR Test', 'Syngenta', 'https://login.salesforce.com', 'test', 'test')
    ],
	subscribers: [],

	addAccount(name, group, url, username, password) {

		this.accounts.push(
			new Account(name, group, url, username, password)
		);

		this.dispatch(ACTION_CHANGED, this.accounts);

		return true;
	},

	subscribe(callback) {
		this.subscribers.push(callback);
	},

	dispatch(action, obj) {
		this.subscribers.forEach((callback) => callback(action, obj))
	}
}