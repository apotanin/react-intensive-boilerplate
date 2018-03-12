
// Instruments
import {
    START_POSTS_FETCHING,
    STOP_POSTS_FETCHING,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR
} from '../../actions/posts/types';

const initialState = {
    data:       [],
    isFetching: false,
    error:      ''
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_POSTS_SUCCESS:
            return Object.assign({}, state, { ...payload });

        case FETCH_POSTS_ERROR:
            return Object.assign({}, state, {
                error: payload
            });

        case START_POSTS_FETCHING:
            return Object.assign({}, state, {
                isFetching: true
            });

        case STOP_POSTS_FETCHING:
            return Object.assign({}, state, {
                isFetching: false
            });

        default:
            return state;
    }
};


// import { CREATE_POST, DELETE_POST, FETCH_POSTS } from '../../actions/posts/types';
//
// const defaultState = [];
//
// export default (state = defaultState, { type, payload }) => {
//     switch (type) {
//         case CREATE_POST:
//             return payload;
//         case FETCH_POSTS:
//             return payload;
//         case DELETE_POST:
//             return payload;
//         default:
//             return state;
//     }
// };
