﻿import React, { Component } from 'react'

export class Select extends Component {
    constructor() {
        super()

        this.state = {
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
                        ref={option => this.option = option}
                        className="form-control col-md-6"
                        onChange={(e) => this.props.func(e)}
                        id={this.props.data}
                        name={this.props.data}                    
                    >
                    <option value="" selected disabled hoidden>Select Category</option>
                    {this.state.options.map(option =>
                        <option value={option.id}>{option.name}</option>)}
                    </select>
            </div>
        )
    }

    clear() {
        this.option.value = "";
    }

    async getExpenseCategories() {
        const response = await fetch('/api/ExpenseCategory/GetAll');
        const data = await response.json();
        this.setState({ options: data.categories });
    }
}