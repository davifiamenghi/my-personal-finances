import React, { Component } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Select';

export class Form extends Component {
    render() {
        return (
            <form onSubmit={this.props.create} className="form-row">
                <Input
                    ref={merchant => this.merchant = merchant}
                    type='text'
                    data='merchant'
                    name='Merchant'
                    func={this.props.merchantSet}
                />
                <Input
                    ref={date => this.date = date}
                    type='date'
                    data='date'
                    name='Date'
                    func={this.props.dateSet}
                    defaultValue={new Date().toLocaleDateString()}
                />
                <Select
                    ref={category => this.category = category}
                    data="category"
                    name='Category'
                    func={this.props.categorySet}
                >
                </Select>
                <Input
                    ref={total => this.total = total}
                    type='number'
                    data='total'
                    name='Total'
                    func={this.props.totalSet}
                />
                <Input
                    ref={note => this.note = note}
                    type='text'
                    data='note'
                    name='Note'
                    func={this.props.noteSet}
                />
                <Button clearInputs={this.clearInputs} />
            </form>
        )
    }

    clearInputs = () => {
        this.merchant.clear();
        this.note.clear();
        this.total.clear();
        this.date.clear();
        this.category.clear();
    }
}