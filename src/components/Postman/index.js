import React, { Component } from 'react';
import Styles from './styles';
import { string } from 'prop-types';


export default class Postman extends Component {
    static contextTypes = {
        avatar:   string.isRequired,
        userName: string.isRequired
    };

    render () {
        const { avatar, userName } = this.context;

        return (
            <section className = { Styles.Postman }>
                <img src = { avatar } />
                <span>{`Welcome back ${userName}`}</span>
            </section>
        );
    }
}
