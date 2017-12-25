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
    constructor () {
        super();
        this.state = {
            posts: [

            /*
            id: string,
            comment: string,
            created: number => moment().unix()
             */
            ]
        };
        this.createPost = ::this._createPost;
        this.deletePost=::this._deletePost;
    }

    _createPost (post) {
        this.setState(({ posts }) => (
            { posts: [post, ...posts]}
        ));
    }

    _deletePost (id) {
        this.setState(({ posts:prevPosts }) => (
            { posts: prevPosts.filter((post) => post.id !== id) }
        ));
    }

    render () {
        const { posts } = this.state;
        const postList = posts.map((post) => (<Post deletePost = { this.deletePost } key = { post.id } { ...post } />));

        return (
            <section className = { Styles.Feed }>
                <Composer createPost = { this.createPost } />
                <Counter counter = { posts.length } />
                {postList}
                <Postman />
                {createPortal(<Spinner />, portalContainer)}
            </section>
        );
    }
}
