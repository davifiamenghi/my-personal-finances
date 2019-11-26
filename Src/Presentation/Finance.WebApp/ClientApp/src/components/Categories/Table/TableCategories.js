import React, { Component } from 'react';
import { TableRow } from './TableRow';
import { deleteExpenseCategory } from '../../../services/expenseCategory-service';
import { deleteIncomeCategory } from '../../../services/incomeCategory-service';
import { notify } from '../../../services/error-service';
import { confirmAlert } from 'react-confirm-alert'; 
import { Table } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class TableCategories extends Component {
    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead className='thead-dark'>
                    <tr>
                        <th>{this.props.isIncome ? "Income Categories" : "Expense Categories"}</th>
                        <th className='centered'>Type Id</th>
                        <th className='centered'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.categories.map(category =>
                        <TableRow
                            key={category.id}
                            category={category}
                            delete={this.delete}
                        />
                    )}
                </tbody>
            </Table>
        )
    }

    delete = id => {
        if (this.props.isIncome) {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure to delete this income.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => deleteIncomeCategory(id)
                            .then((res) => {
                                if (res) {
                                    notify(res.error.split('. ')[1]);
                                    return;
                                }

                                this.props.refresh();
                                notify("Successfully delete an Income Category!");
                            })
                    },
                    {
                        label: 'No'
                    }
                ]
            })
            
        } else {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure to delete this category.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => deleteExpenseCategory(id)
                            .then((res) => {
                                if (res) {
                                    notify(res.error.split('. ')[1]);
                                    return;
                                }

                                this.props.refresh();
                                notify("Successfully delete an Expense Category!");
                            })
                    },
                    {
                        label: 'No'
                    }
                ]
            })            
        }
    }
}