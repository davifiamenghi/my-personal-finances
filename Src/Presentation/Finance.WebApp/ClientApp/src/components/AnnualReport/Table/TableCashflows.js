﻿import React, { Component } from 'react';
import { TableRow } from '../Table/TableRow';
import { Table } from 'react-bootstrap';

export class TableCashflows extends Component {
    render() {
        let totalSavings = this.props.totalIncomes - this.props.totalExpenses < 0 ? 0 : this.props.totalIncomes - this.props.totalExpenses;
        let totalSavingsPer = this.props.totalIncomes === 0 ? 0 : (((this.props.totalIncomes - this.props.totalExpenses) / this.props.totalIncomes) * 100);
        
        return (
            <Table striped bordered hover>
                <thead className='thead-dark'>
                    <tr>
                        <th>Month</th>
                        <th>Income</th>
                        <th>Expense</th>
                        <th>Savings</th>
                        <th>Savings %</th>
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
                        <td>{totalSavings.toFixed(2)} lv.</td>
                        <td>{totalSavingsPer.toFixed(2)}%</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}