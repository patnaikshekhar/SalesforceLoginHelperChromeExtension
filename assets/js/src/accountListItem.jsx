import React from 'react';

export default class AccountListItem extends React.Component {
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
			          <form method="post" action="https://login.salesforce.com/index.jsp">
			          	<input type="hidden" name="un" value={this.props.username} />
			          	<input type="hidden" name="pw" value={this.props.password} />

			          	<input type="submit" className="slds-button" value="Tab"></input>
			          </form>
			    </td>
			    <td>
			          <form method="post" action="https://login.salesforce.com/index.jsp">
			          	<input type="hidden" name="un" value={this.props.username} />
			          	<input type="hidden" name="pw" value={this.props.password} />

			          	<button className="slds-button">Incognito</button>
			          </form>
				</td>
			</tr>
		);
	}
}