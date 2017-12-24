import React, { Component } from 'react';
import Styles from './styles';


export default class Counter extends Component {
    count = 1;

    render () {
        return (
            <section className = { Styles.Counter }>
                {`Post count: ${this.count}`}
            </section>
        );
    }
}
