import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class TableCashflowTypes extends Component {
    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead className='thead-dark'>
                    <tr>
                        <th className='centered'>Id</th>
                        <th>Cashflow Types Description</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cashflowTypes.map(cashflowType =>
                        <tr key={cashflowType.id}>
                            <td className='centered'>{cashflowType.id}</td>
                            <td>{cashflowType.description}</td>
                        </tr> 
                    )}
                </tbody>
            </Table>
        )
    }
}