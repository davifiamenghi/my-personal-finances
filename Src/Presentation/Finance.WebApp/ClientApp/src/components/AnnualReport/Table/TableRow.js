import React, { Component } from 'react';

export class TableRow extends Component {

    render() {
        const monthName = this.props.income.monthName;
        const incomes = this.props.income.sum.toFixed(2);
        const expenses = (this.props.expense.sum).toFixed(2);
        const savings = (this.props.income.sum - this.props.expense.sum).toFixed(2);
        const savingsPer = (this.props.income.sum === 0) ? 0.00 : (((this.props.income.sum - this.props.expense.sum) / this.props.income.sum) * 100).toFixed(2);
        
        return (
            <tr>
                <td>{monthName}</td>
                <td>{incomes} lv.</td>
                <td>{expenses} lv.</td>
                <td>{savings} lv.</td>
                <td>{savingsPer}%</td>
            </tr>
        )
    }
}