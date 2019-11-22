import React, { Component, Fragment } from 'react';
import { Input } from '../Filter/Input';

export class Filter extends Component {
    render() {
        let validateMonth = this.props.month >= 1 && this.props.month <= 12;
        let validateYear = this.props.year >= 1 && this.props.year <= 9999;

        return (
            <Fragment>
                <br />
                <div className="form-row">
                    <div className="col-md-2">
                        <Input
                            ref={month => this.month = month}
                            name="Month"
                            timeChange={this.props.monthChange}
                            placeholder={this.props.month}
                            validate={validateMonth}
                        />
                    </div>
                    <div className="col-md-2">
                        <Input
                            ref={year => this.year = year}
                            name="Year"
                            timeChange={this.props.yearChange}
                            placeholder={this.props.year}
                            validate={validateYear}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.props.refresh}>Get Cashflows</button>
                </div>
                <br />
            </Fragment>
        )
    }

    fillFields = () => {
        this.month.fill(this.props.month);
        this.year.fill(this.props.year);
    }
}