import React, { Component } from 'react';
import { ExpensesTable } from '../Expenses/ExpensesTable'
import { ExpensesForm } from '../Expenses/ExpensesForm'

export class Expenses extends Component {
    static displayName = Expenses.name;
    
    render() {
        return (
            <div>
                <ExpensesForm />
                <ExpensesTable />
            </div>
        );
    }
}