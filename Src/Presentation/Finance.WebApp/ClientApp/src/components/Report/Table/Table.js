import React, { Component } from 'react';
import { TableRow } from '../Table/TableRow';

export class Table extends Component {
    render() {
        return (
            <table className='table table-striped table-bordered table-sm' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className='table-dark'>Category</th>
                        <th className='table-dark'>Type</th>
                        <th className='table-dark'>Monthly</th>
                        <th className='table-dark'>Proportion</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.flows.map(flow =>
                        <TableRow
                            key={flow.id}
                            flow={flow}
                            totals={this.props.totals}
                        />                        
                    )}
                    <tr key={10} className="table-success last-row">                        
                        <td colSpan="2">Total</td>
                        <td>{(this.props.totals).toFixed(2)} lv.</td>
                        <td>100.00%</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}