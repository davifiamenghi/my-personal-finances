import React, { Component } from 'react';
import { TableRow } from './TableRow';
import { deleteExpense } from '../../../services/expense-service';
import { notify } from '../../../services/error-service';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export class TableExpenses extends Component {
    render() {
        return (
            <Table striped hover responsive="sm">
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
                            deleteExpense={this.delete}
                            reset={this.props.reset}
                        />
                    )}
                </tbody>
            </Table>
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
                            this.props.refresh();
                            this.props.reset();
                            notify("Successfully delete an Expense!");
                        })
                },
                {
                    label: 'No'
                }
            ]
        })

    }
}