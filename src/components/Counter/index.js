import React, { Component } from 'react';
import Styles from './styles';
import { number } from 'prop-types';


export default class Counter extends Component {

    static propTypes = {
        counter: number.isRequired
    };

    render () {
        const { counter } = this.props;

        return (
            <section className = { Styles.Counter }>
                {`Post count: ${counter}`}
            </section>
        );
    }
}
