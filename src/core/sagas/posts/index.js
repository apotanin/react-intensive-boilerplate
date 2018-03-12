// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import {
    CREATE_POST, DELETE_POST,
    FETCH_POSTS
} from '../../actions/posts/types';
import { fetchPostsWorker } from './workers/fetchPosts/index';
import { createPostWorker } from './workers/createPost/index';
import { deletePostWorker } from './workers/deletePost/index';

export default {
    * fetchPostsWatcher () {
        yield takeEvery(FETCH_POSTS, fetchPostsWorker);
        yield takeEvery(CREATE_POST, createPostWorker);
        yield takeEvery(DELETE_POST, deletePostWorker);
    }
};
