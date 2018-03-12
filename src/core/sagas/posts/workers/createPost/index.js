// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import postsActions from '../../../../actions/posts/index';


export function* createPostWorker ({ payload: comment }) {
    const { api, token } = yield select((state) => state.profile);

    try {
        if (comment) {
            const response = yield call(fetch, api, {
                method:  'POST',
                headers: {
                    Authorization:  token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            });

            const data = yield call([response, response.json]);

            if (response.status !== 200) {
                throw new Error('create error');
            }

            yield put(postsActions.createPostSuccess(data));
        }
    } catch (e) {
        //TODO implement
    }
}
