import React, { Component } from 'react';
import Styles from './styles';
import { string } from 'prop-types';


export default class Compose extends Component {
    static contextTypes = {
        avatar:   string.isRequired,
        userName: string.isRequired
    };

    render () {
        const { avatar, userName } = this.context;

        return (
            <section className = { Styles.Compose }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What's on your mind, ${userName}?` } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
