import { CREATE_POST, DELETE_POST, FETCH_POSTS } from '../../actions/posts/types';

const defaultState = [];

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case CREATE_POST:
            return payload;
        case FETCH_POSTS:
            return payload;
        case DELETE_POST:
            return payload;
        default:
            return state;
    }
};
