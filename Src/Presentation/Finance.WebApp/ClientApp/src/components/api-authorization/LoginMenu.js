import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const expensesPath = '/Expenses';
            const incomesPath = '/Incomes';
            const categoriesPath = '/Categories';
            const reportPath = '/Monthly-Report';
            const annualReportPath = '/Annual-Report';
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, incomesPath, expensesPath, categoriesPath, reportPath, annualReportPath, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, incomesPath, expensesPath, categoriesPath, reportPath, annualReportPath, profilePath, logoutPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={incomesPath}>Incomes</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={expensesPath}>Expenses</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={categoriesPath}>Categories</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={reportPath}>Monthly Report</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={annualReportPath}>Annual Report</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={profilePath}>My Profile</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
            </NavItem>
        </Fragment>);

    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
            </NavItem>
        </Fragment>);
    }
}
