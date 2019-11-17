import React, { Component } from 'react';

export class TableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.category.name}</td>
                <td>{this.props.category.typeId}</td>
                <td>{this.props.category.expensesSum.toFixed(2)} lv.</td>
                <td>{((this.props.category.expensesSum / this.props.totalExpenses) * 100).toFixed(2)}%</td>
            </tr>
        )
    }
}