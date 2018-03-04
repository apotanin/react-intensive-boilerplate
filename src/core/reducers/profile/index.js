import avatar from '../../../theme/assets/react.jpg';

const GROUP_ID = 'sn8x1osnm1';
const TOKEN = 'a4z3bzb3iq';
const URL = `https://lab.lectrum.io/react/api/${GROUP_ID}`;

const defaultState = {
    api:       URL,
    avatar,
    firstName: 'Aleksandr',
    lastName:  'Potanin',
    token:     TOKEN
};

export default (state = defaultState, { type }) => {
    switch (type) {
        default:
            return state;
    }
};
