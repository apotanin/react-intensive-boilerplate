// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import postsActions from '../../../../actions/posts/index';


export function* deletePostWorker ({ payload:id }) {
    const { api, token } = yield select((state) => state.profile);

    try {
        const response = yield call(fetch, `${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: token
            }
        });

        if (response.status === 204) {
            yield put(postsActions.deletePostSuccess(id));
        }
    } catch (e) {
        //TODO implement
    }
}
