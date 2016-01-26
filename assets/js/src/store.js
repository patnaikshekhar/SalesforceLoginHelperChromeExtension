class Account {
	constructor(id, name, url, environment, username, password, token, lastAccessed) {
        this.id = id;
		this.name = name;
		this.url = url;
        this.environment = environment;
		this.username = username;
		this.password = password;
        this.token = token;
        this.lastAccessed = lastAccessed;
	}
}

var storage = chrome.storage.sync;

export var ACTION_CHANGED = 'changed';

var index = 0;

export default {
    
    initialize() {
        storage.get('accounts', (obj) => {
            
            if ('accounts' in obj) {
                
                // Check if key is fine, else redo
                let accounts = obj['accounts'];
                let index = 0;
                
                accounts.forEach((acc) => {
                   
                   // Update the Last Accessed date if it is null
                   if (!acc.lastAccessed) {
                        acc.lastAccessed = Date.now();    
                   }
                   
                   acc.id = index;
                   index += 1;
                });
                
                this.accounts = accounts;
                this.dispatch(ACTION_CHANGED, this.accounts);
                     
            } else {
                this.accounts = [];      
            }
        });
    },
    
	accounts: [],
   
    getLastIndex: function() {
        index += 1
        return index;
    },
    
	subscribers: [],

	addAccount(name, url, environment, username, password, token) {
		this.accounts.push(
			new Account(this.getLastIndex(), name, url, environment, username, password, token, Date.now())
		);
        
        this.dispatch(ACTION_CHANGED, this.accounts);
        
		return true;
	},
    
    updateAccount(id, name, url, environment, username, password, token) {
        
        this.accounts = this.accounts.map(account => {
            if (id == account.id) {
                account.name = name;
                account.url = url;
                account.environment = environment;
                account.username = username;
                account.password = password;
                account.token = token;
            }
            
            return account;
        });
        
        
		this.dispatch(ACTION_CHANGED, this.accounts);
		return true;
	},
    
    updateCompleteList(accountList) {
        
        // First Reset the indexes
        
        // Check if key is fine, else redo
        let index = 0;
        
        accountList.forEach((acc) => {
            
            // Update the Last Accessed date if it is null
            if (!acc.lastAccessed) {
                acc.lastAccessed = Date.now();    
            }
            
            acc.id = index;
            index += 1;
        });
                
                
        this.accounts = accountList;
        
		this.dispatch(ACTION_CHANGED, this.accounts);
        
		return true;
	},
    
    deleteAccount(id) {
        this.accounts = this.accounts.filter(account => id != account.id);
        this.dispatch(ACTION_CHANGED, this.accounts);
    },
    
    unsubscribe(callback) {
        console.log(callback);
        this.subscribers = this.subscribers.filter((c) => c != callback);
        console.log('Post Unsubscribe', this.subscribers);
    },
    
	subscribe(callback) {
		this.subscribers.push(callback);
	},

	dispatch(action, obj) {
        if (action == ACTION_CHANGED) {
            
            // Sort Accounts before dispatching
            this.sortAccounts();
            
            storage.set({ accounts: this.accounts }, () => {
                this.subscribers.forEach((c) => {
                    c(action, this.accounts);
                });
            });
        }		
    },
    
    // Sort accounts by last accessed
    sortAccounts() {        
        this.accounts.sort((a1, a2) => a2.lastAccessed - a1.lastAccessed);
    },
    
    updateLastAccessed(id) {
        this.accounts = this.accounts.map((acc) => {
            if (acc.id == id) {
                acc.lastAccessed = Date.now();
            } 
            
            return acc;
        });
        
        this.dispatch(ACTION_CHANGED, this.accounts);
		return true;
    }
};