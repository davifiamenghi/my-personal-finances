import React, { Component } from 'react';
import { TableRow } from './TableRow';
import { Table } from 'react-bootstrap';

export class TableReport extends Component {
    render() {
        let total = this.props.totals === 0 ? 0 : 100;
        return (
            <Table striped bordered hover size="sm">
                <thead className='thead-dark'>
                    <tr>
                        <th className="firstColumn">Category</th>
                        <th className="secondColumn">Type</th>
                        <th>Monthly</th>
                        <th>Proportion</th>
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
                        <td>{total.toFixed(2)}%</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}