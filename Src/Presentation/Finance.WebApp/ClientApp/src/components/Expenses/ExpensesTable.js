import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService'
import { DeleteButton } from '../Expenses/TableComponents/DeleteButton';
import { EditButton } from '../Expenses/TableComponents/EditButton';

export class ExpensesTable extends Component {

    constructor(props) {
        super(props);
        this.state = { expenses: [], loading: true };

        //this.populateExpensesData = this.populateExpensesData.bind(this);
        //this.renderExpensesTable = this.renderExpensesTable.bind(this);

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
                <h1 id="tabelLabel" >Expenses</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    renderExpensesTable(data) {
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
        );
    }

    async populateExpensesData() {
        const token = await authService.getAccessToken();
        const response = await fetch('/api/Expense/GetAll', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ expenses: data, loading: false });
    }
}