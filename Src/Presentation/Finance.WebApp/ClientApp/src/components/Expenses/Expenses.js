import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService'
import { DeleteButton } from '../Expenses/TableComponents/DeleteButton';
import { EditButton } from '../Expenses/TableComponents/EditButton';
import { Input } from '../Expenses/FormComponents/Input';
import { Select } from './FormComponents/Select';
import { Button } from './FormComponents/Button';

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
                <br />
                <div className="form-row">
                    <div className="col-md-2">
                        <input className="form-control" name="Month" onChange={this.onMonthChange} placeholder={this.state.month} />
                    </div>
                    <div className="col-md-2">
                        <input className="form-control" name="Year" onChange={this.onYearChange} placeholder={this.state.year} />
                    </div>
                    <button className="btn btn-primary" onClick={this.populateExpensesData.bind(this)} >Get Expenses</button>
                </div>
                <br />
                <form onSubmit={this.createExpense}>
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th className="col-md-2">Merchat</th>
                                <th className="col-md-1">Date</th>
                                <th className="col-md-3">Category</th>
                                <th className="col-md-2">Total</th>
                                <th className="col-md-2">Note</th>
                                <th className="col-md-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Input
                                    ref={merchant => this.merchant = merchant}
                                    type='text'
                                    data='merchant'
                                    name='Merchant'
                                    func={e => { this.setState({ merchant: e.target.value }) }}
                                /></td>
                                <td><Input
                                    ref={date => this.date = date}
                                    type='date'
                                    data='date'
                                    name='Date'
                                    func={e => { this.setState({ date: e.target.value }) }}
                                    defaultValue={this.state.date}
                                /></td>
                                <td><Select
                                    ref={category => this.category = category}
                                    data="category"
                                    name='Category'
                                    func={e => { this.setState({ category: e.target.value }) }}
                                >
                                </Select></td>
                                <td><Input
                                    ref={total => this.total = total}
                                    type='number'
                                    data='total'
                                    name='Total'
                                    func={e => { this.setState({ total: e.target.value }) }}
                                /></td>
                                <td><Input
                                    ref={note => this.note = note}
                                    type='text'
                                    data='note'
                                    name='Note'
                                    func={e => { this.setState({ note: e.target.value }) }}
                                /></td>
                                <td><Button /></td>
                            </tr>
                            {data.expenses.map(expense =>
                                <tr key={expense.merchant}>
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
                </form>
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

    async populateExpensesData() {
        const token = await authService.getAccessToken();
        const response = await fetch(`/api/Expense/GetAll?month=${this.state.month}&year=${this.state.year}`, {
            method: 'GET',
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ expenses: data, loading: false });
    }

    createExpense = event => {
        event.preventDefault();
        let payload = {
            merchant: this.state.merchant,
            date: this.state.date.toString(),
            total: this.state.total,
            categoryId: this.state.category,
            note: this.state.note,
            userId: this.state.userId
        }

        fetch('/api/Expense/Create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(() => {
            this.resetState();
            this.clearInputs();
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

    clearInputs = () => {
        this.merchant.clear();
        this.note.clear();
        this.total.clear();
        this.date.clear();
        this.category.clear();
    }
}