import React, { Component } from 'react';
import { TableRow } from './TableRow';
import { deleteIncome } from '../../../services/income-service';
import { notify } from '../../../services/error-service';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export class TableIncomes extends Component {
    render() {
        return (
            <Table striped hover responsive="sm">
                <thead className='thead-dark'>
                    <tr className="centered">
                        <th>Merchat</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Total</th>
                        <th>Note</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.incomes.map(income =>
                        <TableRow
                            key={income.id}
                            income={income}
                            incomeIdChange={this.props.incomeIdChange}
                            editIncome={this.props.editIncome}
                            deleteIncome={this.delete}
                            reset={this.props.reset}
                        />                        
                    )}
                </tbody>
            </Table>
        )
    }

    delete = id => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this income.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteIncome(id)
                                    .then(() => {
                                        this.props.refresh();
                                        this.props.reset();
                                        notify("Successfully delete an Income!");
                                    })
                },
                {
                    label: 'No'
                }
            ]
        })
        
    }
}