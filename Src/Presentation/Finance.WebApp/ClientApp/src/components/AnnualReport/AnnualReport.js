import React, { Component } from 'react';
import { Filter } from './Filter/Filter';
import { Table } from './Table/Table';
import { getExpensesByYear } from '../../services/expense-service';
import { getIncomesByYear } from '../../services/income-service';

export class AnnualReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            expenses: [],
            incomes: [],
            totalExpenses: 0,
            totalIncomes: 0,
            loading: true
        };
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderExpensesTable(this.state.expenses, this.state.totalExpenses, this.state.incomes, this.state.totalIncomes);

        return (
            <div>
                {contents}
            </div>
        );
    }

    componentDidMount() {
        this.populateData();
    }

    renderExpensesTable(expenses, totalExpenses, incomes, totalIncomes) {
        return (
            <div>
                <h2>Annual Report</h2>
                <br />
                <Filter
                    yearChange={this.onYearChange}
                    refresh={this.populateData}
                    year={this.state.year}
                />

                <Table
                    expenses={expenses}
                    incomes={incomes}
                    totalExpenses={totalExpenses}
                    totalIncomes={totalIncomes}
                    refresh={this.populateExpensesData}
                />
            </div>
        );
    }
    
    onYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
    }

    populateExpensesData = () => {
        getExpensesByYear(this.state.year)
            .then(data => {
                this.setState({
                    expenses: data.expenseSums,
                    totalExpenses: data.totals,
                    loading: false
                });
            }).catch(err => console.log(err));
    }

    populateIncomesData = () => {
        getIncomesByYear(this.state.year)
            .then(data => {
                this.setState({
                    incomes: data.incomeSums,
                    totalIncomes: data.totals,
                    loading: false
                });
            }).catch(err => console.log(err));
    }
    
    populateData = () => {
        this.populateExpensesData();
        this.populateIncomesData();    
    }
}