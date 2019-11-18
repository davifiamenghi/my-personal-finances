import React, { Component } from 'react';
import { getExpensesByYear } from '../../services/expense-service';
import { getIncomesByYear } from '../../services/income-service';

export class AnnualReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            expenses: [],
            incomes: [],
            payToYourself: 0.1,
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
        getExpensesByYear(this.state.year)
            .then(data => console.log(data))

        getIncomesByYear(this.state.year)
            .then(data => console.log(data))
    }

    renderExpensesTable(expenses, totalExpenses, incomes, totalIncomes) {
        return (
            <div>
                <h2>Monthly Report</h2>
            </div>
        );
    }
    
    onYearChange = (event) => {
        this.setState({
            year: event.target.value
        });
    }
    
    populateData = () => {
        this.populateExpensesData();
    }
}