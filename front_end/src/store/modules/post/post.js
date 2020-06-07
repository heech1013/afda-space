import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
// const GET_POST_LIST = 'postList/GET_POST_LIST';
// const GET_ACTIVITIES = 'post/GET_ACTIVITIES';
const GET_NEWSPEED = 'post/GET_NEWSPEED';
const POST_POST = 'post/POST_POST';

/* action creators */
// export const getPostList = createAction(GET_POST_LIST, api.getPostList);
// export const getActivities = createAction(GET_ACTIVITIES, api.getActivities);
export const getNewspeed = createAction(GET_NEWSPEED, api.getNewspeed);
export const postPost = createAction(POST_POST, api.postPost);

/* initial state */
const initialState = Map({
  // posts: List()
  // activities: List()
  newspeed: List()
});

/* reducer */
export default handleActions({
  // ...pender({
  //   type: GET_POST_LIST,
  //   onSuccess: (state, action) => {
  //     const { posts } = action.payload.data;
  //     return state.set('posts', fromJS(posts));
  //   }
  // })
  // ...pender({
  //   type: GET_ACTIVITIES,
  //   onSuccess: (state, action) => {
  //     const { activities } = action.payload.data;
  //     return state.set('activities', fromJS(activities));
  //   }
  // })
  ...pender({
    type: GET_NEWSPEED,
    onSuccess: (state, action) => {
      const { newspeed } = action.payload.data;
      return state.set('newspeed', fromJS(newspeed));
    }
  })
}, initialState);