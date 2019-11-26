import React, { Component, Fragment } from 'react';
import { Filter } from '../../shared/Filter/Filter';
import { TableReport } from './Table/TableReport';
import { TableNetflows} from './Table/TableNetflows';
import { getExpensesByCategory } from '../../services/expenseCategory-service';
import { getIncomesByCategory } from '../../services/incomeCategory-service';
import { notify } from '../../services/error-service';
import { collectCashflowFilterErrors } from '../../services/error-service';

export class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth() + 1,
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

    renderExpensesTable(expenses, totalExpenses, incomes, totalIncomes) {
        return (
            <Fragment>
                <h2>Monthly Report</h2>

                <Filter
                    ref='filter'
                    monthChange={this.onMonthChange}
                    yearChange={this.onYearChange}
                    refresh={this.populateData}
                    month={this.state.month}
                    year={this.state.year}
                />

                <h4>Monthly Incomes</h4>
                <TableReport
                    refresh={this.populateIncomesData}
                    flows={incomes}
                    totals={totalIncomes}
                />
                <br />

                <TableNetflows
                    netflow={(this.state.totalIncomes * this.state.payToYourself).toFixed(2)}
                    label="Pay To Yourselef First"
                    number={6} />
                <br />

                <h4>Monthly Expenses</h4>
                <TableReport
                    refresh={this.populateExpensesData}
                    flows={expenses}
                    totals={totalExpenses}
                />
                <br />

                <TableNetflows
                    netflow={(this.state.totalIncomes - (this.state.totalIncomes * this.state.payToYourself) - this.state.totalExpenses).toFixed(2)}
                    label="Net Cashflow"
                    number={10} />

            </Fragment>
        );
    }

    // Lifecycle methods.
    componentDidMount() {
        this.populateData();
    }

    // State change methods.
    populateData = () => {
        let isValidMonthAndYear = this.validateMonthAndYear();

        if (isValidMonthAndYear) {
            getIncomesByCategory(this.state.month, this.state.year)
                .then(incomes => {
                    getExpensesByCategory(this.state.month, this.state.year)
                        .then(expenses => {
                            if (incomes.errors || expenses.errors) {
                                if (incomes.errors) collectCashflowFilterErrors(incomes.errors);
                                if (expenses.errors) collectCashflowFilterErrors(expenses.errors);
                                return;
                            }

                            this.setState({
                                incomes: incomes.incomeCategories,
                                totalIncomes: incomes.totals,
                                expenses: expenses.expenseCategories,
                                totalExpenses: expenses.totals,
                                loading: false
                            });
                        });
                });
        }
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

    // Validation methods.
    validateMonthAndYear = () => {
        let isValidMonth = this.state.month >= 1 && this.state.month <= 12;
        let isValidYear = this.state.year >= 1 && this.state.year <= 9999;

        if (!isValidMonth || !isValidYear) {

            if (!isValidMonth) notify("Invalid Month!");
            if (!isValidYear) notify("Invalid Year!");

            this.refs.filter.fillFields();

            return false;
        }

        return true;
    }
}