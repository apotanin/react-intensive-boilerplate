import React, { Component } from 'react';
import Styles from './styles';
import Like from '../Like';
import { string, number, func } from 'prop-types';
import moment from 'moment';

export default class Post extends Component {
    static contextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    static propTypes = {
        comment:    string.isRequired,
        created:    number.isRequired,
        deletePost: func.isRequired,
        id:         string.isRequired
    };

    constructor () {
        super();
        this.deletePost=::this._deletePost;
    }

    _deletePost = () => {
        const { deletePost, id }=this.props;

        deletePost(id);
    };

    render () {
        const { avatar, firstName, lastName } = this.context;
        const { comment, created } = this.props;

        return (
            <section className = { Styles.Post }>
                <span className = { Styles.cross } onClick = { this.deletePost } />
                <img src = { avatar } />
                <a>{firstName} {lastName}</a>
                <time>It is {moment.unix(created).format('MMMM D h:mm:ss a')}.</time>
                <p>{comment}</p>
                <Like />
            </section>
        );
    }
}
