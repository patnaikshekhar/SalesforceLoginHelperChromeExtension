import React from 'react';
import Helper from './helper';
import Store from './store';
import { Link } from 'react-router';

export default class AccountListItem extends React.Component {
    
    openTab() {
        Helper.openWindow(this.props.url, this.props.username, this.props.password, false, true);   
    }
    
    openWindow() {
        Helper.openWindow(this.props.url, this.props.username, this.props.password);   
    }
    
    openIncognito() {
        Helper.openWindow(this.props.url, this.props.username, this.props.password, true);   
    }
    
    deleteRecord() {
        Store.deleteAccount(this.props.id);
    }
    
	render() {
		return (
			<tr>
				<td className="slds-lookup__item">
                    <Link to={`/add/${this.props.id}`}>
                        <a id="s01" href="#" role="option">
                        <svg aria-hidden="true" className="slds-icon slds-icon-standard-account slds-icon--small">
                            <use xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
                        </svg><span>{this.props.name}</span>&nbsp;
                        </a>
                    </Link>
			    </td>
			    <td>
                    <button className="slds-button slds-button--brand slds-button--small" onClick={ this.deleteRecord.bind(this) }>Delete</button>
			        <button className="slds-button slds-button--brand slds-button--small" onClick={ this.openTab.bind(this) }>Tab</button>
                    <button className="slds-button slds-button--brand slds-button--small" onClick={ this.openWindow.bind(this) }>Window</button>
                    <button className="slds-button slds-button--brand slds-button--small" onClick={ this.openIncognito.bind(this) }>Incognito</button>
				</td>
			</tr>
		);
	}
}