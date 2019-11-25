import React, { Component } from 'react';
import { getAllIncomeCategories } from '../../../services/incomeCategory-service';
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
                className="form-control col-md-12"
                onChange={(e) => this.props.func(e)}
                id={this.props.data}
                name={this.props.data}
                style={{ border: this.props.valid ? '1px solid #0062cc' : '1px solid red' }}
            >
                <option value="" key="0" disabled>Select Category</option>
                {this.state.options.map(option =>
                    <option key={option.id} value={option.id}>{option.name}</option>)}
            </Form.Control>
        )
    }

    // Lifecycle methods.
    componentDidMount() {
        this.getIncomeCategories();
    }

    // State change methods.
    getIncomeCategories = () => {
        getAllIncomeCategories()
            .then(data => this.setState({ options: data.categories }))
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