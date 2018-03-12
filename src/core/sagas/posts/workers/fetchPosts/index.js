// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import postsActions from '../../../../actions/posts/index';

export function* fetchPostsWorker () {
    try {
        yield put(postsActions.startPostsFetching());

        const { posts: { data: posts }, profile: { api }} = yield select((state) => state);

        if (posts.length) {
            throw new Error('posts loaded, no need to refetch');
        }

        const response = yield call(fetch, api, {
            method:  'GET',
            headers: {}
        });

        const data = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error('fetch error');
        }

        yield put(postsActions.fetchPostsSuccess(data));
    } catch ({ message }) {
        yield put(postsActions.fetchPostsError(message));
    } finally {
        yield put(postsActions.stopPostsFetching());
    }
}
