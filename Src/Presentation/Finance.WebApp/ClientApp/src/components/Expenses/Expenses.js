import React, { Component } from 'react';
import { ExpensesTable } from '../Expenses/ExpensesTable'
import { ExpensesForm } from '../Expenses/ExpensesForm'

export class Expenses extends Component {
    
    render() {
        return (
            <div>
                <h2>Add Expense</h2>
                <ExpensesForm refresh={() => this.content.populateExpensesData()} />
                <br/>
                <h2>Monthly Expenses</h2>
                <ExpensesTable ref={instance => { this.content = instance; }} />
            </div>
        );
    }
}