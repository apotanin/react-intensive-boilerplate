import React, { Component } from 'react';
import Styles from './styles';
import { string } from 'prop-types';
import Tooltip from '../Tooltip';

export default class Like extends Component {
    static contextTypes = {
        userName: string.isRequired
    };

    constructor () {
        super();
        this.state = {
            alreadyLiked: false,
            likers:       [],
            selectedUser: ''
        };
        this.doLike = ::this._doLike;
        this.handleLikerMouseEnter = ::this._handleLikerMouseEnter;
        this.handleLikerMouseLeave = ::this._handleLikerMouseLeave;
    }

    _doLike () {
        const _likers = this.state.likers;
        const userName = this.context.userName;

        if (_likers.indexOf(userName)<0) {
            this.setState(({ likers }) => ({
                alreadyLiked: true,
                likers:       [...likers, userName]
            })
            );
        } else {
            this.setState(({ likers }) => ({
                alreadyLiked: false,
                likers:       likers.filter((element) => element!==userName)
            })
            );
        }
    }

    _handleLikerMouseEnter (event) {
        this.setState({
            selectedUser: event.target.dataset.value
        });
    }

    _handleLikerMouseLeave () {
        this.setState({
            selectedUser: ''
        });
    }

    render () {
        const { alreadyLiked, likers, selectedUser } = this.state;
        const likersList = likers.length
            ? likers.map((liker) => (
                <span
                    data-value = { liker }
                    key = { liker }
                    onMouseEnter = { this.handleLikerMouseEnter }
                    onMouseLeave = { this.handleLikerMouseLeave }>
                    { selectedUser === liker
                        ? <Tooltip content = { selectedUser } />
                        : '' }
                    {liker}</span>
            ))
            : <span>0</span>;

        return (
            <section className = { Styles.Like }>
                <span
                    className = { alreadyLiked ? Styles.unLikeIcon : Styles.likeIcon }
                    onClick = { this.doLike }>Like</span>
                <div>
                    {likersList}
                </div>
            </section>
        );
    }
}
