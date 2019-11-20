import React, { Component } from 'react'
import { getAllCashflowTypes } from '../../../services/cashflowType-service';

export class Select extends Component {
    constructor() {
        super()

        this.state = {
            selectedValue: "0",
            options: []
        }
    }

    componentDidMount() {
        this.getCashflowTypes();
    }

    render() {
        return (
            <div className="form-group">
                <select
                    defaultValue={this.state.selectedValue}
                    ref={option => this.option = option}
                    className="form-control col-md-12"
                    onChange={(e) => this.props.func(e)}
                    id={this.props.data}
                    name={this.props.data}
                >
                    <option value="0" key="0" disabled hidden>Select Cashflow Type</option>
                    {this.state.options.map(option =>
                        <option key={option.id} value={option.id}>{option.description}</option>)}
                </select>
            </div>
        )
    }

    clear() {
        this.option.value = "0";
    }

    getCashflowTypes = () => {
        let lowNum = 0;
        let highNum = 0;

        if (this.props.isIncome) {
            lowNum = 1;
            highNum = 5
        } else {
            lowNum = 7;
            highNum = 9;
        }

        getAllCashflowTypes()
            .then(data => this.setState({ options: data.cashflowTypes.filter(x => x.id >= lowNum && x.id <= highNum) }))
            .catch(err => console.log(err));
    }
}