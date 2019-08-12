import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_POST_LIST = 'postList/GET_POST_LIST';

/* action creators */
export const getPostList = createAction(GET_POST_LIST, api.getPostList);

/* initial state */
const initialState = Map({
  posts: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_POST_LIST,
    onSuccess: (state, action) => {
      const { posts } = action.payload.data;
      return state.set('posts', fromJS(posts));
    }
  })
}, initialState);

/*
GET 'api/posts' 응답 결과(-> action.payload) : { config: {...}, data: {...}, ... }
action.payload.data: { posts: Array(2) }
action.payload.data.posts: [ {id:1, body:...}, {id:2, body:...} ]
*/