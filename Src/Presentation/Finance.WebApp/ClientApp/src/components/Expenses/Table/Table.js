import React, { Component } from 'react';
import { TableRow } from '../Table/TableRow';
import { deleteExpense } from '../../../services/expense-service';
import { notify } from '../../../services/error-service';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

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
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this expense.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteExpense(id)
                        .then(() => {
                            this.props.refresh()
                            notify("Successfully delete an Income!");
                        })
                },
                {
                    label: 'No'
                }
            ]
        })

    }
}