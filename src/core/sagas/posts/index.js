// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import {
    FETCH_POSTS
} from '../../actions/posts/types';
import { fetchPostsWorker } from './workers/fetchPosts/index';

export default {
    * fetchPostsWatcher () {
        yield takeEvery(FETCH_POSTS, fetchPostsWorker);
    }
};
