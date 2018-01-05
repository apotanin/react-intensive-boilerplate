// Core
import React, { Component } from 'react';

// Instruments
import Feed from '../../components/Feed';
import avatar from '../../theme/assets/react.jpg';
import { string } from 'prop-types';

const GROUP_ID = 'sn8x1osnm1';
const TOKEN = 'a4z3bzb3iq';
const URL = `https://lab.lectrum.io/react/api/${GROUP_ID}`;

const appSettings = {
    api:       URL,
    avatar,
    firstName: 'Aleksandr',
    lastName:  'Potanin',
    token:     TOKEN
};

export default class App extends Component {
    static childContextTypes = {
        api:       string.isRequired,
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,
        token:     string.isRequired
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
