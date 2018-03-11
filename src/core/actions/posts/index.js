import { CREATE_POST, DELETE_POST, FETCH_POSTS } from './types';

export const createPost = (post) => async (dispatch, getState) => {

    const { profile:{ api, token }, posts }=getState();

    const newPost = null;

    try {
        const resp = await fetch(api, {
            method:  'POST',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        if (resp.status === 200) {
            const { data } = await resp.json();

            dispatch({
                type:    CREATE_POST,
                payload: [data, ...posts] || posts
            });
        }
    } catch (e) {
        console.log(`Cannot create post. Error ${e}`);
    }
};

export const fetchPosts = () => async (dispatch, getState) => {
    const { profile:{ api }, posts } = getState();

    let fetchedData = null;

    try {
        const resp = await fetch(api, {
            method:  'GET',
            headers: {}
        });
        const { data } = await resp.json();

        fetchedData = data;

    } catch (e) {
        console.log(`Posts were not fetched. Error ${e}`);
    } finally {
        dispatch({
            type:    FETCH_POSTS,
            payload: fetchedData || [...posts]
        });
    }
};

export const deletePost = (id) => async (dispatch, getState) => {
    const { profile: { api, token }, posts }=getState();

    try {
        const resp = await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: token
            }
        });
        if (resp.status === 204) {
            dispatch({
                type:    DELETE_POST,
                payload: posts.filter((post) => post.id !== id)
            });
        } else {
            console.log(`Cannot remove post. Error ${resp.status}`);
        }
    } catch (e) {
        console.log(`Cannot remove post. Error ${e}`);
    }
};
