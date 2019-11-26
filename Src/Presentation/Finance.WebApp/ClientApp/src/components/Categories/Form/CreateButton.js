import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class CreateButton extends Component {
    render() {
        return (
            <Button type="submit" variant='primary' onClick={this.props.clearInputs}>Create</Button>
        )
    }   
}