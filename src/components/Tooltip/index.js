import React, { Component } from 'react';
import Styles from './styles';
import { string } from 'prop-types';

export default class Tooltip extends Component {
    static propTypes = {
        content: string.isRequired
    };

    render () {
        const { content } = this.props;

        return (<ul className = { Styles.Tooltip }>
            <li>
                {content}
            </li>
        </ul>);
    }
}
