// Core
import { all } from 'redux-saga/effects';

// Instruments
import posts from './posts/index';

export function* saga () {
    yield all([
        posts.fetchPostsWatcher()
    ]);
}
