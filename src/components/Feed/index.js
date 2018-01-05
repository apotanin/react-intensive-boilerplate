import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Composer from '../Composer';
import Post from '../Post';
import Styles from './styles';
import Spinner from '../Spinner';
import Postman from '../Postman';
import Counter from '../Counter';
import { fromTo, Back } from 'gsap';
import { Transition, TransitionGroup } from 'react-transition-group';

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

    componentWillMount () {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');

        this.setState({ posts });
    }

    componentWillUpdate (_, { posts }) {
        this.saveToLocalStorage(posts);
    }

    saveToLocalStorage = (value) => {
        localStorage.setItem('posts', JSON.stringify(value));
    };

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

    handleEnter = (e) => {
        fromTo(
            e,
            1,
            {
                scale:   0,
                opacity: 0
            },
            {
                scale:   1,
                opacity: 1
            }
        );
    };

    handleExit = (e) => {
        fromTo(
            e,
            0.7,
            {
                x:         0,
                y:         0,
                opacity:   1,
                rotationZ: 0
            },
            {
                ease:      Back.easeIn.config(4),
                x:         500,
                y:         200,
                rotationZ: 90,
                opacity:   0.5
            }
        );
    };


    render () {
        const { posts } = this.state;
        const postList = posts.map((post) => (
            <Transition
                appear
                in
                key = { post.id }
                timeout = { { enter: 1000, exit: 700 } }
                onEnter = { this.handleEnter }
                onExit = { this.handleExit }>
                <Post deletePost = { this.deletePost } { ...post } />
            </Transition>
        ));

        return (
            <section className = { Styles.Feed }>
                <Composer createPost = { this.createPost } />
                <Counter counter = { posts.length } />
                <TransitionGroup>
                    {postList}
                </TransitionGroup>
                <Postman />
                {createPortal(<Spinner />, portalContainer)}
            </section>
        );
    }
}
