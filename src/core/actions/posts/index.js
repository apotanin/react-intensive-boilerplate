import {
    CREATE_POST, CREATE_POST_SUCCESS, DELETE_POST, DELETE_POST_SUCCESS,
    FETCH_POSTS, FETCH_POSTS_ERROR, FETCH_POSTS_SUCCESS, START_POSTS_FETCHING,
    STOP_POSTS_FETCHING
} from './types';

export default Object.freeze({
    fetchPosts: () => ({
        type: FETCH_POSTS
    }),
    fetchPostsSuccess: (payload) => ({
        type: FETCH_POSTS_SUCCESS,
        payload
    }),
    fetchPostsError: (payload) => ({
        type: FETCH_POSTS_ERROR,
        payload
    }),
    startPostsFetching: () => ({
        type: START_POSTS_FETCHING
    }),
    stopPostsFetching: () => ({
        type: STOP_POSTS_FETCHING
    }),

    createPost: (payload) => ({
        type: CREATE_POST,
        payload
    }),
    createPostSuccess: ({ data }) => ({
        type:    CREATE_POST_SUCCESS,
        payload: data
    }),
    deletePost: (payload) => ({
        type: DELETE_POST,
        payload
    }),
    deletePostSuccess: (id) => ({
        type:    DELETE_POST_SUCCESS,
        payload: id
    })

});

// import { CREATE_POST, DELETE_POST, FETCH_POSTS } from './types';
//
// export const createPost = (post) => async (dispatch, getState) => {
//
//     const { profile:{ api, token }, posts }=getState();
//
//     const newPost = null;
//
//     try {
//         const resp = await fetch(api, {
//             method:  'POST',
//             headers: {
//                 Authorization:  token,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(post)
//         });
//
//         if (resp.status === 200) {
//             const { data } = await resp.json();
//
//             dispatch({
//                 type:    CREATE_POST,
//                 payload: [data, ...posts] || posts
//             });
//         }
//     } catch (e) {
//         console.log(`Cannot create post. Error ${e}`);
//     }
// };
//
// export const fetchPosts = () => async (dispatch, getState) => {
//     const { profile:{ api }, posts } = getState();
//
//     let fetchedData = null;
//
//     try {
//         const resp = await fetch(api, {
//             method:  'GET',
//             headers: {}
//         });
//         const { data } = await resp.json();
//
//         fetchedData = data;
//
//     } catch (e) {
//         console.log(`Posts were not fetched. Error ${e}`);
//     } finally {
//         dispatch({
//             type:    FETCH_POSTS,
//             payload: fetchedData || [...posts]
//         });
//     }
// };
//
// export const deletePost = (id) => async (dispatch, getState) => {
//     const { profile: { api, token }, posts }=getState();
//
//     try {
//         const resp = await fetch(`${api}/${id}`, {
//             method:  'DELETE',
//             headers: {
//                 Authorization: token
//             }
//         });
//         if (resp.status === 204) {
//             dispatch({
//                 type:    DELETE_POST,
//                 payload: posts.filter((post) => post.id !== id)
//             });
//         } else {
//             console.log(`Cannot remove post. Error ${resp.status}`);
//         }
//     } catch (e) {
//         console.log(`Cannot remove post. Error ${e}`);
//     }
// };
