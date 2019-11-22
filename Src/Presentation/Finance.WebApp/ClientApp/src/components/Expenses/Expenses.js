import React, { Component } from 'react';
import { Filter } from '../../shared/Filter/Filter';
import { Form } from './Form/Form';
import { Table } from './Table/Table';
import { getAllExpenses } from '../../services/expense-service';
import { notify } from '../../services/error-service';

export class Expenses extends Component {

    constructor(props) {
        super(props);
        this.state = {            
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            expenses: [],
            loading: true, 
            expenseId: ''
        };
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderExpensesTable(this.state.expenses);

        return (
            <div>
                {contents}
            </div>
        );
    }

    componentDidMount() {
        this.populateExpensesData();        
    }

    renderExpensesTable(data) {
        return (
            <div>
                <h2>Monthly Expenses</h2>
                <br />
                <p className="reference">* When you update expense, if you do not chose a date, the expense will be updated with the same date.</p>
                <Filter
                    ref='filter'
                    monthChange={this.onMonthChange}
                    yearChange={this.onYearChange}
                    refresh={this.populateExpensesData}
                    month={this.state.month}
                    year={this.state.year}
                />

                <Form
                    refresh={this.populateExpensesData}
                    ref={instance => { this.fillInputs = instance; }}
                    expenseId={this.state.expenseId}
                />

                <Table
                    expenseIdChange={this.onExpenseIdChange}
                    editExpense={() => this.fillInputs.fillInputs(this.state.expenseId)}
                    refresh={this.populateExpensesData}
                    data={data}
                />
                
            </div>
        );
    }

    onMonthChange = (event) => {
        this.setState({
            month: event.target.value
        });
    }

    onYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
    }

    onExpenseIdChange = (id) => {
        this.setState({
            expenseId: id
        });
    }

    populateExpensesData = () => {
        let validateMonth = this.state.month >= 1 && this.state.month <= 12;
        let validateYear = this.state.year >= 1 && this.state.year <= 9999;

        if (!validateMonth) {
            notify("Invalid month!");
            this.setState({
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
            });

            this.refs.filter.fillFields();
            return;
        }

        if (!validateYear) {
            notify("Invalid year!");
            this.setState({
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
            });

            return;
        }
        getAllExpenses(this.state.month, this.state.year)
            .then(data => this.setState({ expenses: data, loading: false }))
            .catch(err => console.log(err));
    }    
}