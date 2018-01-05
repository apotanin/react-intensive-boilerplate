import React, { Component } from 'react';
import Styles from './styles';
import { array, func, string } from 'prop-types';
import Tooltip from '../Tooltip';

export default class Like extends Component {
    static contextTypes = {
        likeHandler: func.isRequired
    };

    static propTypes = {
        likes:  array.isRequired,
        postId: string.isRequired
    };

    constructor (props) {
        super(props);
        this.state = {
            likers:      props.likes,
            showTooltip: false
        };
        this.doLike = ::this._doLike;
        this.handleLikerMouseEnter = ::this._handleLikerMouseEnter;
        this.handleLikerMouseLeave = ::this._handleLikerMouseLeave;
    }

    async _doLike () {
        const { likeHandler } = this.context;
        const { postId } = this.props;
        const likers = await likeHandler(postId);

        console.log(likers.myId);
        this.setState({
            likers
        });
    }

    _handleLikerMouseEnter (event) {
        this.setState({
            showTooltip: true
        });
    }

    _handleLikerMouseLeave () {
        this.setState({
            showTooltip: false
        });
    }

    render () {
        const { likers, showTooltip } = this.state;

        let likerRow = '';

        switch (likers.length) {
            case 0:
                likerRow = 0;
                break;
            case 1:
                likerRow = likers[0].id === likers.myId ? `You ` :
                    `${likers[0].firstName} ${likers[0].lastName}`;
                break;
            case 2:
                likerRow = likers.myId
                    ? likers[0].id === likers.myId
                        ? `You & ${likers[1].firstName} ${likers[1].lastName}`
                        : `You & ${likers[0].firstName} ${likers[0].lastName}`
                    : `${likers[0].firstName} ${likers[0].lastName} & ${likers[1].firstName} ${likers[1].lastName}`;
                break;
            default:
                likerRow = likers.myId
                    ? `You & ${likers.length - 1} more`
                    : `${likers.length} more`;
        }

        return (
            <section className = { Styles.Like }>
                <span
                    className = { likers.myId ? Styles.unLikeIcon : Styles.likeIcon }
                    onClick = { this.doLike }>Like</span>
                <div>
                    <span
                        onMouseEnter = { this.handleLikerMouseEnter }
                        onMouseLeave = { this.handleLikerMouseLeave }>
                        {likerRow}
                        { showTooltip && likers.length
                            ? <Tooltip content = { likers } />
                            : '' }
                    </span>
                </div>
            </section>
        );
    }
}
