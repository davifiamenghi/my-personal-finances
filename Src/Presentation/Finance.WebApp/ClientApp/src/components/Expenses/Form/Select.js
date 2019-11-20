import React, { Component } from 'react'
import { getAllExpenseCategories } from '../../../services/expenseCategory-service';

export class Select extends Component {
    constructor() {
        super()

        this.state = {
            selectedValue: "0",
            options: []
        }
    }

    componentDidMount() {
        this.getExpenseCategories();
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
                    <option value="0" key="0" disabled>Select Category</option>
                    {this.state.options.map(option =>
                        <option key={option.id} value={option.id}>{option.name}</option>)}
                </select>
            </div>
        )
    }

    clear() {

        this.option.value = "0";
    }

    fill(id) {
        this.option.value = id;
    }

    getExpenseCategories = () => {
        getAllExpenseCategories()
            .then(data => this.setState({ options: data.categories }))
            .catch(err => console.log(err));
    }
}