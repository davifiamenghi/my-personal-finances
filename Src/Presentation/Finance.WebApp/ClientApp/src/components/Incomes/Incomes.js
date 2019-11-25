import React, { Component, Fragment } from 'react';
import { Filter } from '../../shared/Filter/Filter';
import { CreateForm } from './Form/CreateForm';
import { TableIncomes } from './Table/TableIncomes';
import { getAllIncomes } from '../../services/income-service';
import { notify } from '../../services/error-service';
import { collectCashflowFilterErrors } from '../../services/error-service';

export class Incomes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            incomes: [],
            loading: true,
            incomeId: ''
        };
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderIncomesTable(this.state.incomes);

        return (
            <div>
                {contents}
            </div>
        );
    }

    renderIncomesTable(data) {
        return (
            <Fragment>
                <h2>Monthly Incomes</h2>
                <br />
                <p className="reference">* When you update income, if you do not chose a date, the Income will be updated with the same date.</p>
                <Filter
                    ref='filter'
                    monthChange={this.onMonthChange}
                    yearChange={this.onYearChange}
                    refresh={this.populateIncomesData}
                    month={this.state.month}
                    year={this.state.year}
                />

                <CreateForm
                    refresh={this.populateIncomesData}
                    ref={instance => { this.createForm = instance; }}
                    incomeId={this.state.incomeId}
                />

                <TableIncomes
                    incomeIdChange={this.onIncomeIdChange}
                    editIncome={() => this.createForm.fillInputs(this.state.incomeId)}
                    reset={() => this.createForm.cancel()}
                    refresh={this.populateIncomesData}
                    data={data}
                />
            </Fragment>
        );
    }

    // Lifecycle methods.
    componentDidMount() {
        this.populateIncomesData();
    }

    // State change methods.
    populateIncomesData = () => {
        let isValidMonthAndYear = this.validateMonthAndYear();

        if (isValidMonthAndYear) {
            getAllIncomes(this.state.month, this.state.year)
                .then(data => {
                    if (data.errors) {
                        collectCashflowFilterErrors(data.errors);
                        return;
                    }
                    this.setState({ incomes: data, loading: false })
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

    onIncomeIdChange = (id) => {
        this.setState({
            incomeId: id
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