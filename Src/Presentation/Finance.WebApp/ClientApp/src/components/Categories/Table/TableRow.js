import React, { Component } from 'react';
import { DeleteButton } from './DeleteButton';

export class TableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.category.name}</td>
                <td className='centered'>{this.props.category.typeId}</td>
                <td className='centered'><DeleteButton delete={this.props.delete} id={this.props.category.id} /></td>
            </tr> 
        )
    }
}