import React, { Component } from 'react';
import { EditButton } from '../Table/EditButton';
import { DeleteButton } from '../Table/DeleteButton';

export class TableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.income.merchant}</td>
                <td>{this.props.income.date}</td>
                <td>{this.props.income.category}</td>
                <td>{this.props.income.total.toFixed(2)} lv.</td>
                <td>{this.props.income.note}</td>
                <td><EditButton incomeIdChange={this.props.incomeIdChange} editIncome={this.props.editIncome} incomeId={this.props.income.id} /> <DeleteButton deleteIncome={this.props.deleteIncome} incomeId={this.props.income.id} /></td>
            </tr>
        )
    }
}