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
                    <tr key={this.props.rowKey} className="table-primary totals-row">                        
                        <td colSpan="2">Total</td>
                        <td>{(this.props.totals).toFixed(2)} lv.</td>
                        <td>{total.toFixed(2)}%</td>
                    </tr>
                    <tr key={this.props.number} className={this.props.styleRow + " totals-row"}>
                        <td>{this.props.label}</td>
                        <td>{this.props.number}</td>
                        <td colSpan="2">{this.props.netflow} lv.</td>
                    </tr>                    
                </tbody>
            </Table>
        )
    }
}