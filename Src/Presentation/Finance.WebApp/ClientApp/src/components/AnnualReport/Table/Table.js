import React, { Component } from 'react';
import { TableRow } from '../Table/TableRow';

export class Table extends Component {
    render() {
        return (
            <table className='table table-striped table-bordered' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className='table-dark'>Month</th>
                        <th className='table-dark'>Income</th>
                        <th className='table-dark'>Expense</th>
                        <th className='table-dark'>Savings</th>
                        <th className='table-dark'>Savings %</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cashflows.incomes.map((income, key) =>
                        <TableRow
                            key={income.month}
                            income={income}
                            expense={this.props.cashflows.expenses[key]}
                        />
                    )}
                    <tr key={13} className="table-success last-row">
                        <td>Totals</td>
                        <td>{this.props.totalIncomes.toFixed(2)} lv.</td>
                        <td>{this.props.totalExpenses.toFixed(2)} lv.</td>
                        <td>{(this.props.totalIncomes - this.props.totalExpenses).toFixed(2)} lv.</td>
                        <td>{(((this.props.totalIncomes - this.props.totalExpenses) / this.props.totalIncomes) * 100).toFixed(2)}%</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}