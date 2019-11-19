import React, { Component, Fragment } from 'react';

export class Filter extends Component {
    render() {
        return (
            <Fragment>
                <br />
                <div className="form-row">
                    <div className="col-md-2">
                        <input className="form-control" name="Year" onChange={this.props.yearChange} placeholder={this.props.year} />
                    </div>
                    <button className="btn btn-primary" onClick={this.props.refresh}>Get Report</button>
                </div>
                <br />
            </Fragment>
        )
    }
}