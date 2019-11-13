import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService'
import { DeleteButton } from '../Expenses/TableComponents/DeleteButton';
import { EditButton } from '../Expenses/TableComponents/EditButton';

export class ExpensesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            expenses: [], loading: true
        };
    }

    componentDidMount() {
        this.populateExpensesData();
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
                <br />
                <div class="form-row">
                    <div class="col-md-2">
                        <input class="form-control" name="Month" onChange={this.onMonthChange} placeholder={this.state.month} />
                    </div>
                    <div class="col-md-2">
                        <input class="form-control" name="Year" onChange={this.onYearChange} placeholder={this.state.year} />
                    </div>
                    <button class="btn btn-primary" onClick={this.populateExpensesData.bind(this)} >Get Expenses</button>
                </div>
                <br />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Merchat</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Total</th>
                            <th>Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
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

        console.log(this.state.year)
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
}