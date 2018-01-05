import React, { Component } from 'react';
import Styles from './styles';
import { string, func } from 'prop-types';
import { getUniqueID } from '../../helpers';
import moment from 'moment';
import { Transition, TransitionGroup } from 'react-transition-group';
import { fromTo, Power4 } from 'gsap';


export default class Compose extends Component {
    static contextTypes = {
        avatar:   string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
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

    handleEnter = (e) => {
        fromTo(
            e,
            1.5,
            {
                x:         1300,
                y:         -300,
                opacity:   0,
                rotationY: 360
            },
            {
                x:         0,
                y:         0,
                opacity:   1,
                rotationY: 0
            }
        );
    };

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
        const { avatar, firstName, lastName } = this.context;
        const { comment } = this.state;

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this.handleEnter }>
                <section className = { Styles.Compose }>
                    <img src = { avatar } />
                    <form onSubmit = { this.submit }>
                        <textarea
                            placeholder = { `What's on your mind, ${firstName} ${lastName}?` }
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
            </Transition>
        );
    }
}
