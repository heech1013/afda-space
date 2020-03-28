import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
// const GET_POST_LIST = 'postList/GET_POST_LIST';
const GET_ACTIVITIES = 'post/GET_ACTIVITIES';

/* action creators */
// export const getPostList = createAction(GET_POST_LIST, api.getPostList);
export const getActivities = createAction(GET_ACTIVITIES, api.getActivities);

/* initial state */
const initialState = Map({
  // posts: List()
  activities: List()
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
  ...pender({
    type: GET_ACTIVITIES,
    onSuccess: (state, action) => {
      const { activities } = action.payload.data;
      return state.set('activities', fromJS(activities));
    }
  })
}, initialState);