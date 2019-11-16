import React, { Component } from 'react';
import { EditButton } from '../Table/EditButton';
import { DeleteButton } from '../Table/DeleteButton';

export class TableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.expense.merchant}</td>
                <td>{this.props.expense.date}</td>
                <td>{this.props.expense.category}</td>
                <td>{this.props.expense.total.toFixed(2)} lv.</td>
                <td>{this.props.expense.note}</td>
                <td><EditButton expenseIdChange={this.props.expenseIdChange} editExpense={this.props.editExpense} expenseId={this.props.expense.id} /> <DeleteButton deleteExpense={this.props.deleteExpense} expenseId={this.props.expense.id} /></td>
            </tr>
        )
    }
}