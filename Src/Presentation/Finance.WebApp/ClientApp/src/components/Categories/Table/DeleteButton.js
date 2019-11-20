import React, { Component } from 'react';

export class DeleteButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-danger categoryDelete" onClick={() => this.props.delete(this.props.id)}>Delete</button>
        )
    }
}