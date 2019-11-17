import React, { Component } from 'react';
import { TableRow } from '../Table/TableRow';

export class Table extends Component {
    render() {
        return (
            <table className='table table-striped table-bordered table-sm' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Monthly</th>
                        <th>Proportion</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.categories.map(category =>
                        <TableRow
                            key={category.id}
                            category={category}
                            totalExpenses={this.props.totalExpenses}
                        />                        
                    )}
                    <tr key={10} className="table-success last-row">                        
                        <td colSpan="2">Total Expenses</td>
                        <td>{(this.props.totalExpenses).toFixed(2)} lv.</td>
                        <td>100.00%</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}