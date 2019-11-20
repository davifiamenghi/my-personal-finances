import React, { Component } from 'react';
import { TableRow } from '../Table/TableRow';
import { deleteExpense } from '../../../services/expense-service';

export class Table extends Component {
    render() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead className='thead-dark'>
                    <tr className="centered">
                        <th>Merchat</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Total</th>
                        <th>Note</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.expenses.map(expense =>
                        <TableRow
                            key={expense.id}
                            expense={expense}
                            expenseIdChange={this.props.expenseIdChange}
                            editExpense={this.props.editExpense}
                            deleteExpense={this.delete} />                        
                    )}
                </tbody>
            </table>
        )
    }

    delete = id => {
        deleteExpense(id)
            .then(() => this.props.refresh())
            .catch(err => console.log(err));
    }
}