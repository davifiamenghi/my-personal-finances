import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from '../components/Layout/Layout';
import { Home } from '../components/Home/Home';
import { Expenses } from '../components/Expenses/Expenses';
import { Incomes } from '../components/Incomes/Incomes';
import { Report } from '../components/Report/Report';
import AuthorizeRoute from '../components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from '../components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from '../components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <AuthorizeRoute path='/incomes' component={Incomes} />
                <AuthorizeRoute path='/expenses' component={Expenses} />
                <AuthorizeRoute path='/monthly-report' component={Report} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}
