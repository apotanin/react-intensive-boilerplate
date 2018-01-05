import React, { Component } from 'react';
import Styles from './styles';
import Like from '../Like';
import { array, string, number, func } from 'prop-types';
import moment from 'moment';

export default class Post extends Component {

    static propTypes = {
        avatar:     string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        deletePost: func.isRequired,
        firstName:  string.isRequired,
        id:         string.isRequired,
        lastName:   string.isRequired,
        likes:      array.isRequired
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
        const { avatar, comment, created, id, firstName, lastName, likes } = this.props;

        return (
            <section className = { Styles.Post }>
                <span className = { Styles.cross } onClick = { this.deletePost } />
                <img src = { avatar } />
                <a>{firstName} {lastName}</a>
                <time>It is {moment.unix(created).format('MMMM D h:mm:ss a')}.</time>
                <p>{comment}</p>
                <Like likes = { likes } postId = { id } />
            </section>
        );
    }
}
