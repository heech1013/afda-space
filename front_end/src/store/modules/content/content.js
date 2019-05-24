import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_CONTENT = 'content/GET_CONTENT';
const GET_CONTENT_LIST = 'content/GET_CONTENT_LIST';
const GET_CONTENT_SYMPTOM_LIST = 'content/GET_CONTENT_SYMPTOM_LIST';


/* action creators */
export const getContent = createAction(GET_CONTENT, api.getContent);
export const getContentList = createAction(GET_CONTENT_LIST, api.getContentList);
export const getContentSymptomList = createAction(GET_CONTENT_SYMPTOM_LIST, api.getContentSymptomList);

/* initial state */
const initialState = Map({
  content: Map(),
  contentList: List(),
  contentSymptomList: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_CONTENT,
    onSuccess: (state, action) => {
      const { content } = action.payload.data;
      return state.set('content', fromJS(content));
    }
  }),
  ...pender({
    type: GET_CONTENT_LIST,
    onSuccess: (state, action) => {
      const { contentList } = action.payload.data;
      return state.set('contentList', fromJS(contentList));
    }
  }),
  ...pender({
    type: GET_CONTENT_SYMPTOM_LIST,
    onSuccess: (state, action) => {
      const { contentSymptomList } = action.payload.data;
      return state.set('contentSymptomList', fromJS(contentSymptomList));
    }
  })
}, initialState);