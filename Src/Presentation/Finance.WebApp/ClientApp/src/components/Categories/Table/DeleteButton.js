import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class DeleteButton extends Component {
    render() {
        return (
            <Button type="button" variant="danger categoryDelete" onClick={() => this.props.delete(this.props.id)}>Delete</Button>
        )
    }
}