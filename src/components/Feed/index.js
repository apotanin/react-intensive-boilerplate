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
import { func, string } from 'prop-types';

const portalContainer = document.getElementById('spinner');

export default class Feed extends Component {
    static contextTypes ={
        api:       string.isRequired,
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,
        token:     string.isRequired
    };

    static childContextTypes ={
        likeHandler: func.isRequired
    };

    constructor () {
        super();
        this.state = {
            posts: [

            /*
            id: string,
            comment: string,
            created: number => moment().unix()
             */
            ],
            spinnerShow: false
        };
        this.createPost = ::this._createPost;
        this.deletePost=::this._deletePost;

        this.intervel = setInterval(this._fetchPosts, 5000);
    }

    getChildContext () {
        return { likeHandler: this._likeHandler };
    }

    componentWillMount () {
        // const posts = JSON.parse(localStorage.getItem('posts') || '[]');

        // this.setState({ posts });
    }

    componentDidMount () {
        this._fetchPosts();
    }

    componentWillUnmount () {
        clearInterval(this.intervel);
    }

    // componentWillUpdate (_, { posts }) {
    //     this.saveToLocalStorage(posts);
    // }

    // saveToLocalStorage = (value) => {
    //     localStorage.setItem('posts', JSON.stringify(value));
    // };

    _fetchPosts = async () => {
        const { api }=this.context;

        this.setState({ spinnerShow: true });

        try {
            const resp = await fetch(api, {
                method:  'GET',
                headers: {}
            });
            const { data } = await resp.json();
            const posts = data || [];

            this.setState({ posts });
        } catch (e) {
            console.log(`Posts were not fetched. Error ${e}`);
        } finally {
            this.setState({ spinnerShow: false });
        }

    };

    async _createPost (post) {
        const { api, token }=this.context;

        try {
            const resp = await fetch(api, {
                method:  'POST',
                headers: {
                    Authorization:  token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });

            if (resp.status === 200) {
                const { data } = await resp.json();
                const newPost = data || '[]';

                this.setState(({ posts }) => (
                    { posts: [newPost, ...posts]}
                ));
            }
        } catch (e) {
            console.log(`Cannot create post. Error ${e}`);
        }
    }

    async _deletePost (id) {
        const { api, token }=this.context;

        try {
            const resp = await fetch(`${api}/${id}`, {
                method:  'DELETE',
                headers: {
                    Authorization: token
                }
            });

            if (resp.status === 204) {
                this.setState(({ posts:prevPosts }) => (
                    { posts: prevPosts.filter((post) => post.id !== id) }
                ));
            } else {
                console.log(`Cannot remove post. Error ${resp.status}`);
            }
        } catch (e) {
            console.log(`Cannot remove post. Error ${e}`);
        }
    }

    _likeHandler = async (postId) => {
        const { api, token, firstName, lastName }=this.context;

        try {
            const resp = await fetch(`${api}/${postId}`, {
                method:  'PUT',
                headers: {
                    Authorization: token
                }
            });

            if (resp.status === 200) {
                const { data={}} = await resp.json();

                const myLike = data.likes.find((_) => _.firstName === firstName && _.lastName===lastName);

                data.likes.myId = myLike ? myLike.id : null;

                return data.likes;
            }
            console.log(`Cannot like post. Error ${resp.status}`);

        } catch (e) {
            console.log(`Cannot like post. Error ${e}`);
        }
    };

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
        const { posts, spinnerShow } = this.state;
        const { firstName, lastName } = this.context;
        const postList = posts.map((post) => {
            const myLike = post.likes.find((_) => _.firstName === firstName && _.lastName===lastName);

            post.likes.myId = myLike ? myLike.id : null;

            return (<Transition
                appear
                in
                key = { post.id }
                timeout = { { enter: 1000, exit: 700 } }
                onEnter = { this.handleEnter }
                onExit = { this.handleExit }>
                <Post deletePost = { this.deletePost } { ...post } />
            </Transition>);
        });

        return (
            <section className = { Styles.Feed }>
                <Composer createPost = { this.createPost } />
                <Counter counter = { posts.length } />
                <TransitionGroup>
                    {postList}
                </TransitionGroup>
                <Postman />
                {spinnerShow && createPortal(<Spinner />, portalContainer)}
            </section>
        );
    }
}
