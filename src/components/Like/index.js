import React, { Component } from 'react';
import Styles from './styles';

const likeCount = 0;

export default class Like extends Component {
    render () {
        return (
            <section className = { Styles.Like }>
                <span className = { Styles.likeIcon }>Like</span>
                <div>
                    <span>{likeCount}</span>
                </div>
            </section>
        );
    }
}
