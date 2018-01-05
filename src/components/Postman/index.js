import React, { Component } from 'react';
import Styles from './styles';
import { string } from 'prop-types';
import { Transition, TransitionGroup } from 'react-transition-group';
import { fromTo, Power4 } from 'gsap';


export default class Postman extends Component {
    static contextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    state = {
        show: true
    };

    componentDidMount () {
        setTimeout(() => {
            this.setState({ show: false });
        }, 2000);
    }

    handleEnter = (element) => {
        fromTo(element, 2, { x: 300 }, { ease: Power4.easeOut, x: 0 });
    };

    handleExit = (element) => {
        fromTo(element, 2, { x: 0 }, { ease: Power4.easeIn, x: 300 });
    };

    render () {
        const { avatar, firstName, lastName } = this.context;
        const { show } = this.state;

        const postman = (<Transition
            appear
            timeout = { 2000 }
            onEnter = { this.handleEnter }
            onExit = { this.handleExit }>
            <section className = { Styles.Postman }>
                <img src = { avatar } />
                <span>{`Welcome back ${firstName} ${lastName}`}</span>
            </section>
        </Transition>);

        return (
            <TransitionGroup>
                {show && postman}
            </TransitionGroup>
        );


    }
}
