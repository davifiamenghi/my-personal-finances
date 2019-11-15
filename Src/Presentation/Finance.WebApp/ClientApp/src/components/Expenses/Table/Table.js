import React, { Component } from 'react';
import { EditButton } from '../Table/EditButton';
import { DeleteButton } from '../Table/DeleteButton';
import { deleteExpense } from '../../../services/expense-service';

export class Table extends Component {
    render() {
        return (
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
                    {this.props.data.expenses.map(expense => 
                        <tr key={expense.id}>
                            <td>{expense.merchant}</td>
                            <td>{expense.date}</td>
                            <td>{expense.category}</td>
                            <td>{expense.total.toFixed(2)} lv.</td>
                            <td>{expense.note}</td>
                            <td><EditButton /> <DeleteButton deleteExpense={this.delete} expenseId={expense.id} /></td>
                        </tr>
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