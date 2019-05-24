import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_FORUM_LIST = 'forum/GET_FORUM_LIST';

/* action creators */
export const getForumList = createAction(GET_FORUM_LIST, api.getContentList);

/* initial state */
const initialState = Map({
  forumList: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_FORUM_LIST,
    onSuccess: (state, action) => {
      const { forumList } = action.payload.data;
      return state.set('forumList', fromJS(forumList));
    }
  })
}, initialState);