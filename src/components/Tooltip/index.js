import React, { Component } from 'react';
import Styles from './styles';
import { array } from 'prop-types';

export default class Tooltip extends Component {
    static propTypes = {
        content: array.isRequired
    };

    render () {
        const { content } = this.props;

        return (<ul className = { Styles.Tooltip }>
            <li>
                {[...content].reduce((result, element) => result+=`${element.firstName} ${element.lastName} `, '')}
            </li>
        </ul>);
    }
}
