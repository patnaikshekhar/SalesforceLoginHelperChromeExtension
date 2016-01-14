import React from 'react';
import Helper from './helper';

export default class AccountListItem extends React.Component {
    
    openTab() {
        Helper.openWindow('http://login.salesforce.com', 'patnaikshekhar@wave.com', 'shepat9871', false, true);   
    }
    
    openWindow() {
        Helper.openWindow('http://login.salesforce.com', 'patnaikshekhar@wave.com', 'shepat9871');   
    }
    
    openIncognito() {
        Helper.openWindow('http://login.salesforce.com', 'patnaikshekhar@wave.com', 'shepat9871', true);   
    }
    
	render() {
		return (
			<tr>
				<td className="slds-lookup__item">
					<a id="s01" href="#" role="option">
			          <svg aria-hidden="true" className="slds-icon slds-icon-standard-account slds-icon--small">
			            <use xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
			          </svg><span>{this.props.name}</span>&nbsp;
			        </a>
			    </td>
			    <td>
			        <button className="slds-button slds-button--brand slds-button--small" onClick={ this.openTab.bind(this) }>Tab</button>
                    <button className="slds-button slds-button--brand slds-button--small" onClick={ this.openWindow.bind(this) }>Window</button>
                    <button className="slds-button slds-button--brand slds-button--small" onClick={ this.openIncognito.bind(this) }>Incognito</button>
				</td>
			</tr>
		);
	}
}