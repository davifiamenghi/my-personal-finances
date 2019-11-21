import React, { Component } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';
import authService from '../../api-authorization/AuthorizeService';
import { getIncome } from '../../../services/income-service';
import { createIncome } from '../../../services/income-service';
import { updateIncome } from '../../../services/income-service';
import { isValid, parseISO } from 'date-fns';
import { collectCashflowErrors } from '../../../services/error-service';

export class Form extends Component {
    constructor() {
        super()

        this.state = {
            merchant: '',
            date: new Date().toLocaleString(),
            total: 0.00,
            categoryId: "",
            note: '',
            options: [],
            userId: '',
            isCreate: true,
            errors: []
        }
    }

    render() {
        let validMerchant = this.state.merchant.length <= 50;
        let validDate = isValid(parseISO(this.state.date));
        let validCategory = this.state.categoryId !== "";
        let validNote = this.state.note <= 200;
        let validTotal = this.state.total >= 0.01;

        return (
            <div className="container">
                <div className="row">                   
                    <form onSubmit={this.state.isCreate ? this.create : this.update} className="form-row">
                        <div className="col-md-2">
                            <Input
                                ref={merchant => this.merchant = merchant}
                                type='text'
                                data='merchant'
                                name='Merchant'
                                func={e => { this.setState({ merchant: e.target.value }) }}
                                valid={validMerchant}
                            />
                        </div>
                        <div className="col-md-2">
                            <Input
                                ref={date => this.date = date}
                                type='date'
                                data='date'
                                name='Date'
                                func={e => { this.setState({ date: e.target.value }) }}
                                valid={validDate}
                            />
                        </div>
                        <div className="col-md-2">
                            <Select
                                ref={category => this.category = category}
                                data="category"
                                name='Category'
                                func={e => { this.setState({ categoryId: e.target.value }) }}
                                valid={validCategory}
                            >
                            </Select>
                        </div>
                        <div className="col-md-2">
                            <Input
                                ref={total => this.total = total}
                                type='number'
                                data='total'
                                name='Total'
                                func={e => { this.setState({ total: e.target.value }) }}
                                valid={validTotal}
                            />
                        </div>
                        <div className="col-md-2">
                            <Input
                                ref={note => this.note = note}
                                type='text'
                                data='note'
                                name='Note'
                                func={e => { this.setState({ note: e.target.value }) }}
                                valid={validNote}
                            />
                        </div>
                        <div className="col-md-2">
                            <Button
                                clearInputs={this.clearInputs}
                                isCreate={this.state.isCreate}
                            />
                        </div>
                    </form>
                </div>
            </div>            
        )
    }

    componentDidMount() {
        authService
            .getUser()
            .then(user => {
                this.setState({
                    userId: user.sub
                });
            });
    }    

    clearInputs = () => {
        this.merchant.clear();
        this.note.clear();
        this.total.clear();
        this.date.clear();
        this.category.clear();
    }

    fillFields = () => {
        this.merchant.fill(this.state.merchant);
        this.note.fill(this.state.note);
        this.total.fill(this.state.total);
        this.date.fill(this.state.date);
        this.category.fill(this.state.categoryId);
    }

    fillInputs = id => {
        getIncome(id)
            .then(income => {
                this.updateState(income);
                this.fillFields();
                this.setState({ isCreate: false });
            });
    }

    create = event => {
        event.preventDefault();
        let payload = this.getPayload();

        createIncome(payload)
            .then((res) => {
                if (res) {
                    collectCashflowErrors(res.errors);
                    this.fillFields();
                } else {
                    this.resetState();
                    this.props.refresh();
                }    
            });
    }

    update = event => {
        event.preventDefault();
        let payload = this.getPayload();

        updateIncome(payload)
            .then((res) => {
                if (res) {
                    collectCashflowErrors(res.errors);
                    this.fillFields();
                } else {
                    this.resetState();
                    this.props.refresh();
                }
            });
    }

    resetState = () => {
        this.setState({
            merchant: '',
            date: new Date().toLocaleString(),
            total: 0.00,
            categoryId: "",
            note: '',
            isCreate: true
        });
    }

    updateState = income => {
        this.setState({
            merchant: income.merchant,
            date: income.date,
            total: income.total,
            categoryId: income.categoryId,
            note: income.note,
            isCreate: false
        });
    }

    getPayload = () => {
        let payload = {
            merchant: this.state.merchant,
            date: this.state.date.toString(),
            total: this.state.total,
            categoryId: this.state.categoryId,
            note: this.state.note,
            userId: this.state.userId,
            id: this.props.incomeId
        }

        return payload;
    }
}