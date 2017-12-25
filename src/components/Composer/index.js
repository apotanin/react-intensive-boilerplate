import React, { Component } from 'react';
import Styles from './styles';
import { string, func } from 'prop-types';
import { getUniqueID } from '../../helpers';
import moment from 'moment';


export default class Compose extends Component {
    static contextTypes = {
        avatar:   string.isRequired,
        userName: string.isRequired
    };

    static propTypes = {
        createPost: func.isRequired
    };

    constructor (props) {
        super(props);
        this.state = {
            comment: ''
        };
        this.submit = ::this._submit;
        this.handleInputAreaKeys = ::this._handleInputAreaKeys;
        this.handleTextAreaChange= ::this._handleTextAreaChange;
    }

    _handleTextAreaChange (event) {
        this.setState({ comment: event.target.value });
    }

    _handleInputAreaKeys (event) {
        if (event.key === 'Enter') {
            this.submit(event);
        }
    }

    _submit (event) {
        event.preventDefault();
        const { comment }= this.state;

        if (comment) {
            this.props.createPost({
                comment,
                id:      getUniqueID(),
                created: moment().unix()
            });
            this.setState({ comment: '' });
        }
    }

    render () {
        const { avatar, userName } = this.context;
        const { comment } = this.state;

        return (
            <section className = { Styles.Compose }>
                <img src = { avatar } />
                <form onSubmit = { this.submit }>
                    <textarea
                        placeholder = { `What's on your mind, ${userName}?` }
                        value = { comment }
                        onChange = { this.handleTextAreaChange }
                        onKeyPress = { this.handleInputAreaKeys }
                    />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}
