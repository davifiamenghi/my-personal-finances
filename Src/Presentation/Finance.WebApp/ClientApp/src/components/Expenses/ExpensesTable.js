import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService'

export class ExpensesTable extends Component {

    constructor(props) {
        super(props);
        this.state = { expenses: [], loading: true };
    }

    componentDidMount() {
        this.populateExpensesData();
    }

    static renderExpensesTable(data) {
        return (
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
                            <td><button type="button" className="btn btn-primary btn-sm">Edit</button> <button type="button" className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ExpensesTable.renderExpensesTable(this.state.expenses);

        return (
            <div>
                <h1 id="tabelLabel" >Expenses</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateExpensesData() {
        const token = await authService.getAccessToken();
        const response = await fetch('https://localhost:5001/api/Expense/GetAll', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ expenses: data, loading: false });
    }
}