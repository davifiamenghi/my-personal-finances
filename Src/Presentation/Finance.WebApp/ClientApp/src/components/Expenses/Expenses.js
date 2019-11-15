import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService'
import { Filter } from '../../shared/Filter/Filter';
import { Form } from './Form/Form';
import { Table } from './Table/Table';
import { getAllExpenses } from '../../services/expense-service';
import { createExpense } from '../../services/expense-service';

export class Expenses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            merchant: '',
            date: new Date().toLocaleString(),
            total: 0.00,
            categoryId: '',
            note: '',
            options: [],
            userId: '',
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            expenses: [],
            loading: true
        };
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderExpensesTable(this.state.expenses);

        return (
            <div>
                {contents}
            </div>
        );
    }

    componentDidMount() {
        this.populateExpensesData();

        authService
            .getUser()
            .then(user => {
                this.setState({
                    userId: user.sub
                });
            });
    }

    renderExpensesTable(data) {
        return (
            <div>
                <h2>Monthly Expenses</h2>

                <Filter
                    monthChange={this.onMonthChange}
                    yearchange={this.onYearChange}
                    refresh={this.populateExpensesData}
                    month={this.state.month}
                    year={this.state.year}
                />

                <Form
                    create={this.create}
                    merchantSet={e => { this.setState({ merchant: e.target.value }) }}
                    dateSet={e => { this.setState({ date: e.target.value }) }}
                    categorySet={e => { this.setState({ categoryId: e.target.value }) }}
                    totalSet={e => { this.setState({ total: e.target.value }) }}
                    noteSet={e => { this.setState({ note: e.target.value }) }}
                />

                <Table refresh={this.populateExpensesData} data={data} />

            </div>
        );
    }

    onMonthChange = (event) => {
        this.setState({
            month: event.target.value
        });
    }

    onYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
    }

    populateExpensesData = () => {
        getAllExpenses(this.state.month, this.state.year)
            .then(data => this.setState({ expenses: data, loading: false }))
            .catch(err => console.log(err));
    }

    create = event => {
        event.preventDefault();
        let payload = {
            merchant: this.state.merchant,
            date: this.state.date.toString(),
            total: this.state.total,
            categoryId: this.state.categoryId,
            note: this.state.note,
            userId: this.state.userId
        }

        createExpense(payload)
            .then(() => {
                this.resetState();
                this.populateExpensesData();
            });
    }

    resetState = () => {
        this.setState({
            merchant: '',
            date: new Date().toLocaleString(),
            total: 0.00,
            categoryId: '',
            note: ''
        });
    }
}