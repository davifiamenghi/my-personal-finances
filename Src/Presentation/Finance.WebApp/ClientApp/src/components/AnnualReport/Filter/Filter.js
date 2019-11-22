import React, { Component, Fragment } from 'react';
import { Input } from '../../../shared/Filter/Input';

export class Filter extends Component {
    render() {
        let validateYear = this.props.year >= 1 && this.props.year <= 9999;

        return (
            <Fragment>
                <br />
                <div className="form-row">
                    <div className="col-md-2">
                        <Input
                            ref={year => this.year = year}
                            name="Year"
                            timeChange={this.props.yearChange}
                            placeholder={this.props.year}
                            validate={validateYear}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.props.refresh}>Get Report</button>
                </div>
                <br />
            </Fragment>
        )
    }

    fillFields = () => {
        this.year.fill(this.props.year);
    }
}