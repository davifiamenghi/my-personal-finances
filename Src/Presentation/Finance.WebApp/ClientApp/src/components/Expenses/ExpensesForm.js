import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';
import { Expenses } from '../Expenses/Expenses'
import ReactDOM from 'react-dom';

export class ExpensesForm extends Component {
    constructor() {
        super()

        this.state = {
            merchant: '',
            date: Date.now.toString(),
            total: 0.00,
            category: '',
            note: '',
            options: [],
            userId: ''            
        }
    }

    getUserId() {
        authService
            .getUser()
            .then(user => {
                return user.sub;
            });
    }

    componentDidMount() {
        this.getExpenseCategories();

        authService
            .getUser()
            .then(user => {
                this.setState({
                    userId: user.sub
                });
            });
    }

    render() {
        return (
            <form onSubmit={this.createExpense.bind(this)}>
                <div className="form-group">
                    <label htmlFor='Merchant'>Merchant</label>
                    <div>
                        <input
                            id='Merchant'
                            className="form-control col-md-6"
                            type='text'
                            name='Merchant'
                            onChange={this.onMerchantChange.bind(this)}
                            value={this.state.merchant}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor='Date'>Date</label>
                    <div>
                        <input
                            id="Date"
                            className="form-control col-md-6"
                            type='date'
                            name='Date'
                            onChange={this.onDateChange.bind(this)}
                            value={this.state.date}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor='Total'>Total</label>
                    <div>
                        <input
                            id='Total'
                            className="form-control col-md-6"
                            type='number'
                            name='Total'
                            onChange={this.onTotalChange.bind(this)}
                            value={this.state.total}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor='Note'>Note</label>
                    <div>
                        <input
                            id='Note'
                            className="form-control col-md-6"
                            name='Note'
                            type='text'
                            value={this.state.note}
                            onChange={this.onNoteChange.bind(this)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor='Category'>Categories</label>
                    <div>
                        <select
                            id='Category'
                            className="form-control col-md-6"
                            name='Category'
                            value={this.state.category}
                            onChange={this.onCategoryChange.bind(this)}
                        >
                            <option value="0" selected>Select Category</option>
                            {this.state.options.map(option =>
                                <option value={option.id}>{option.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>

                <input
                    type='hidden'
                    name="UserId"
                    value={this.state.userId}
                />
            </form >
        );
    }

    createExpense(e) {
        e.preventDefault();
        let payload = {
            merchant: this.state.merchant,
            date: this.state.date.toString(),
            total: this.state.total,
            categoryId: this.state.category,
            note: this.state.note,
            userId: this.state.userId
        }
        
        fetch('/api/Expense/Create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        this.setState({
            merchant: '',
            date: Date.now.toString(),
            total: 0.00,
            category: '',
            note: ''
        });
    }

    onMerchantChange(event) {
        this.setState({
            merchant: event.target.value
        });
    }

    onDateChange(event) {
        this.setState({
            date: event.target.value
        });
    }

    onTotalChange(event) {
        this.setState({
            total: event.target.value
        });
    }

    onNoteChange(event) {
        this.setState({
            note: event.target.value
        });
    }

    onCategoryChange(event) {
        this.setState({
            category: event.target.value
        });
    }

    async getExpenseCategories() {
        const response = await fetch('/api/ExpenseCategory/GetAll');
        const data = await response.json();
        this.setState({ options: data.categories });
    }
}