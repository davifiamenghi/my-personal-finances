import React, { Component } from 'react'
import { getAllCashflowTypes } from '../../../services/cashflowType-service';
import { Form } from 'react-bootstrap';

export class Select extends Component {
    constructor() {
        super()

        this.state = {
            selectedValue: "",
            options: []
        }
    }

    render() {
        return (
            <Form.Control as="select"
                defaultValue={this.state.selectedValue}
                ref={option => this.option = option}
                onChange={(e) => this.props.func(e)}
                id={this.props.data}
                name={this.props.data}
                style={{ border: this.props.validate ? '1px solid #0062cc' : '1px solid red' }}
            >
                <option value="" key="0" disabled hidden>Select Cashflow Type</option>
                {this.state.options.map(option =>
                    <option key={option.id} value={option.id}>{option.description}</option>)}
            </Form.Control>
        )
    }

    // Lifecycle methods.
    componentDidMount() {
        this.getCashflowTypes();
    }

    // State change methods.
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

    // Helper methods.
    clear() {
        this.option.value = "";
    }

    fill(id) {
        this.option.value = id;
    }    
}