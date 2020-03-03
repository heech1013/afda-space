import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_FORUM = 'forum/GET_FORUM';
const GET_FORUM_COMMENT_LIST = 'forum/GET_FORUM_COMMENT_LIST';
const GET_FORUM_LIST = 'forum/GET_FORUM_LIST';

/* action creators */
export const getForum = createAction(GET_FORUM, api.getContent);
export const getForumCommentList = createAction(GET_FORUM_COMMENT_LIST, api.getContentCommentList);
export const getForumList = createAction(GET_FORUM_LIST, api.getStationList);

/* initial state */
const initialState = Map({
  forum: Map(),
  forumCommentList: List(),
  forumList: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_FORUM,
    onSuccess: (state, action) => {
      const { forum } = action.payload.data;
      return state.set('forum', fromJS(forum));
    }
  }),
  ...pender({
    type: GET_FORUM_COMMENT_LIST,
    onSuccess: (state, action) => {
      const { forumCommentList } = action.payload.data;
      return state.set('forumCommentList', fromJS(forumCommentList));
    }
  }),
  ...pender({
    type: GET_FORUM_LIST,
    onSuccess: (state, action) => {
      const { forumList } = action.payload.data;
      return state.set('forumList', fromJS(forumList));
    }
  })
}, initialState);