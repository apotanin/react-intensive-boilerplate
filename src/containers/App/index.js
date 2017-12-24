// Core
import React, { Component } from 'react';

// Instruments
import Feed from '../../components/Feed';
import avatar from '../../theme/assets/react.jpg';
import { string } from 'prop-types';

const appSettings = {
    avatar,
    userName: 'Alex'
};

export default class App extends Component {
    static childContextTypes = {
        avatar:   string.isRequired,
        userName: string.isRequired
    };

    getChildContext () {
        return { ...appSettings };
    }

    // timer = setInterval(() => this.forceUpdate(), 1000);

    render () {
        return (
            <Feed />
        );
    }
}
