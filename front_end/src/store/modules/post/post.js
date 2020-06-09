import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_NEWSPEED = 'post/GET_NEWSPEED';
const POST_POST = 'post/POST_POST';
const POST_POST_COMMENT = 'post/POST_POST_COMMENT';

/* action creators */
export const getNewspeed = createAction(GET_NEWSPEED, api.getNewspeed);
export const postPost = createAction(POST_POST, api.postPost);
export const postPostComment = createAction(POST_POST_COMMENT, api.postPostComment);

/* initial state */
const initialState = Map({
  newspeed: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_NEWSPEED,
    onSuccess: (state, action) => {
      const { newspeed } = action.payload.data;
      return state.set('newspeed', fromJS(newspeed));
    }
  })
}, initialState);