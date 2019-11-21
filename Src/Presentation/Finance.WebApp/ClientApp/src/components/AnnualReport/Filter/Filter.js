import React, { Component, Fragment } from 'react';

export class Filter extends Component {
    render() {
        let validateYear = this.props.year >= 1 && this.props.year <= 9999;

        return (
            <Fragment>
                <br />
                <div className="form-row">
                    <div className="col-md-2">
                        <input
                            className="form-control"
                            name="Year"
                            onChange={this.props.yearChange}
                            placeholder={this.props.year}
                            style={{ border: validateYear ? '1px solid #0062cc' : '1px solid red' }}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.props.refresh}>Get Report</button>
                </div>
                <br />
            </Fragment>
        )
    }
}