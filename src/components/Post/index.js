import React, { Component } from 'react';
import Styles from './styles';
import moment from 'moment';
import Like from '../Like';
import { string } from 'prop-types';

export default class Post extends Component {
    static contextTypes = {
        avatar:   string.isRequired,
        userName: string.isRequired
    };

    render () {
        const { avatar, userName } = this.context;

        return (
            <section className = { Styles.Post }>
                <span className = { Styles.cross } />
                <img src = { avatar } />
                <a>{userName}</a>
                <time>It is {moment().format('MMMM D h:mm:ss a')}.</time>
                <p>Hello!</p>
                <Like />
            </section>
        );
    }
}
