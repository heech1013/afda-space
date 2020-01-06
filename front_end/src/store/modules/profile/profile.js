import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_PROFILE = 'profile/GET_PROFILE';
const UPDATE_PROFILE_CARD = 'profile/UPDATE_PROFILE_CARD';
const GET_USER_CONTENT_LIST = 'profile/GET_USER_CONTENT_LIST';
const POST_USER_DIAGNOSIS = 'profile/POST_USER_DIAGNOSIS';

/* action creators */
export const getProfile = createAction(GET_PROFILE, api.getProfile);
export const updateProfileCard = createAction(UPDATE_PROFILE_CARD, api.updateProfileCard);
export const getUserContentList = createAction(GET_USER_CONTENT_LIST, api.getUserContentList);
export const postUserDiagnosis = createAction(POST_USER_DIAGNOSIS, api.postUserDiagnosis);

/* initial state */
const initialState = Map({
  profile: Map(),
  // profileCardUpdate: Map({
  //   nick: '',
  //   introduction: '',
  //   error: null
  // }),
  contents: List(),
  error: Map({
    profileCardUpdate: null,
    userDiagnosisCreate: null
  })
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_PROFILE,
    onSuccess: (state, action) => {
      const { profile } = action.payload.data;
      return state.set('profile', fromJS(profile));
    }
  }),
  ...pender({
    type: UPDATE_PROFILE_CARD,
    // onSuccess: (state, action) => {
    //   return state.setIn(['profileCardUpdate', 'nick'], '')
    //               .setIn(['profileCardUpdate', 'introduction'], '');
    // },
    onError: (state, action) => {
      return state.setIn(['error', 'profileCardUpdate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: GET_USER_CONTENT_LIST,
    onSuccess: (state, action) => {
      const { contents } = action.payload.data;
      return state.set('contents', fromJS(contents));
    }
  }),
  ...pender({
    type: POST_USER_DIAGNOSIS,
    onError: (state, action) => {
      return state.setIn(['error', 'userDiagnosisCreate'], action.payload.response.data.message);
    }
  })
}, initialState);