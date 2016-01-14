import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import ListAccounts from './listAccounts';
import EditAccount from './editAccount';
import Template from './template';

export default class App extends React.Component {
    render() {
       return (
            <Router>
                <Route path="/" component={Template}>
                    <IndexRoute component={ListAccounts} />
                    <Route path="add" component={EditAccount} />
                </Route>
            </Router>  
       );
    }
}