import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService'
import { DeleteButton } from './Table/DeleteButton';
import { EditButton } from './Table/EditButton';
import { Filter } from '../../shared/Filter/Filter';
import { Form } from './Form/Form';
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
            expenses: [], loading: true
        };
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

                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th className="col-md-2">Merchat</th>
                            <th className="col-md-2">Date</th>
                            <th className="col-md-2">Category</th>
                            <th className="col-md-2">Total</th>
                            <th className="col-md-2">Note</th>
                            <th className="col-md-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.expenses.map(expense =>
                            <tr key={expense.id}>
                                <td>{expense.merchant}</td>
                                <td>{expense.date}</td>
                                <td>{expense.category}</td>
                                <td>{expense.total.toFixed(2)} lv.</td>
                                <td>{expense.note}</td>
                                <td><EditButton /> <DeleteButton deleteExpense={() => {
                                    fetch(`/api/Expense/Delete/${expense.id}`, {
                                        method: 'DELETE',
                                        headers: { 'content-type': 'application/json' }
                                    }).then(() => {
                                        this.populateExpensesData()
                                    });
                                }} /></td>
                            </tr>
                        )}
                    </tbody>
                </table>

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