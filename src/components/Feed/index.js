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
import { array, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from '../../core/actions/posts';

const portalContainer = document.getElementById('spinner');

class Feed extends Component {
    static propTypes = {
        actions: object.isRequired,
        posts:   array.isRequired,
        profile: object.isRequired
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
        this.deletePost=::this._deletePost;

        this.intervel = setInterval(this._fetchPosts, 60000);
        // this.intervel = setInterval(this._fetchPosts, 5000);
    }

    getChildContext () {
        return { likeHandler: this._likeHandler };
    }

    componentDidMount () {
        this._fetchPosts();
    }

    componentWillUnmount () {
        clearInterval(this.intervel);
    }

    _fetchPosts = () => this.props.actions.fetchPosts();

    _createPost = (post) => this.props.actions.createPost(post);

    _deletePost = (id) => this.props.actions.deletePost(id);

    _likeHandler = async (postId) => {
        const { api, token, firstName, lastName }=this.props.profile;

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
        const { spinnerShow } = this.state;
        const { avatar, firstName, lastName } = this.props.profile;
        const { posts } = this.props;

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
                <Composer createPost = { this._createPost } />
                <Counter counter = { posts.length } />
                <TransitionGroup>
                    {postList}
                </TransitionGroup>
                <Postman { ...{ avatar, firstName, lastName } } />
                {spinnerShow && createPortal(<Spinner />, portalContainer)}
            </section>
        );
    }
}

const mapStateToProps = ({ profile, posts }) => ({
    profile,
    posts
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(postsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
