import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Composer from '../Composer';
import Post from '../Post';
import Styles from './styles';
import Spinner from '../Spinner';
import Postman from '../Postman';
import Counter from '../Counter';

const portalContainer = document.getElementById('spinner');

export default class Feed extends Component {
    render () {
        return (
            <section className = { Styles.Feed }>
                <Composer />
                <Counter />
                <Post />
                <Postman />
                {createPortal(<Spinner />, portalContainer)}
            </section>
        );
    }
}
