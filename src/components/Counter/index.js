import React, { Component } from 'react';
import Styles from './styles';
import { number } from 'prop-types';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';


export default class Counter extends Component {

    static propTypes = {
        counter: number.isRequired
    };

    handleEnter = (e) => {
        fromTo(
            e,
            1.5,
            {
                x:         -1000,
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

    render () {
        const { counter } = this.props;

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this.handleEnter }>
                <section className = { Styles.Counter }>
                    {`Post count: ${counter}`}
                </section>
            </Transition>
        );
    }
}
