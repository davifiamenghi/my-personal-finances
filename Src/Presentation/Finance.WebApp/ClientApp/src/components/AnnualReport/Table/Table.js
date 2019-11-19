import React, { Component } from 'react';

export class Table extends Component {
    render() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Income</th>
                        <th>Expense</th>
                        <th>Savings</th>
                        <th>Savings %</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.incomes.map((income, key) =>
                        <tr key={income.month}>
                            <td>{income.monthName}</td>
                            <td>{income.sum} lv.</td>
                            <td>{this.props.expenses[key].sum} lv.</td>
                            <td>{(income.sum - this.props.expenses[key].sum).toFixed(2)} lv.</td>
                            <td>{(((income.sum - this.props.expenses[key].sum) / income.sum) * 100).toFixed(2)}%</td>
                        </tr>                       
                    )}
                </tbody>
            </table>
        )
    }
}