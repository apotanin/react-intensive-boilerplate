
// Instruments
import {
    START_POSTS_FETCHING,
    STOP_POSTS_FETCHING,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_ERROR, CREATE_POST_SUCCESS, DELETE_POST_SUCCESS
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

        case CREATE_POST_SUCCESS:
            return Object.assign({}, state, { data: [payload, ...state.data]});

        case DELETE_POST_SUCCESS: {
            const posts = state.data.filter((post) => post.id !== payload);

            return Object.assign({}, state, { data: posts });
        }

        default:
            return state;
    }
};
