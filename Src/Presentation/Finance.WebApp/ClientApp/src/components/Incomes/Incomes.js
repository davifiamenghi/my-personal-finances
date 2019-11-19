import React, { Component } from 'react';
import { Filter } from '../../shared/Filter/Filter';
import { Form } from './Form/Form';
import { Table } from './Table/Table';
import { getAllIncomes } from '../../services/income-service';

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

    componentDidMount() {
        this.populateIncomesData();
    }

    renderIncomesTable(data) {
        return (
            <div>
                <h2>Monthly Incomes</h2>
                <br />
                <p className="reference">* When you update income, if you do not chose a date, the Income will be updated with the same date.</p>
                <Filter
                    monthChange={this.onMonthChange}
                    yearChange={this.onYearChange}
                    refresh={this.populateIncomesData}
                    month={this.state.month}
                    year={this.state.year}
                />

                <Form
                    refresh={this.populateIncomesData}
                    ref={instance => { this.fillInputs = instance; }}
                    incomeId={this.state.incomeId}
                />

                <Table
                    incomeIdChange={this.onIncomeIdChange}
                    editIncome={() => this.fillInputs.fillInputs(this.state.incomeId)}
                    refresh={this.populateIncomesData}
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

    onIncomeIdChange = (id) => {
        this.setState({
            incomeId: id
        });
    }

    populateIncomesData = () => {
        getAllIncomes(this.state.month, this.state.year)
            .then(data => this.setState({ incomes: data, loading: false }))
            .catch(err => console.log(err));
    }
}