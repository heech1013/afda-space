import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_PROFILE = 'profile/GET_PROFILE';
const UPDATE_PROFILE_CARD = 'profile/UPDATE_PROFILE_CARD';

/* action creators */
export const getProfile = createAction(GET_PROFILE, api.getProfile);
export const updateProfileCard = createAction(UPDATE_PROFILE_CARD, api.updateProfileCard);

/* initial state */
const initialState = Map({
  profile: Map(),
  profileCardUpdate: Map({
    nick: '',
    introduction: '',
    error: null
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
    onSuccess: (state, action) => {
      return state.setIn(['profileCardUpdate', 'nick'], '')
                  .setIn(['profileCardUpdate', 'introduction'], '');
    },
    onError: (state, action) => {
      return state.setIn(['profileCardUpdate', 'error'], action.payload.response.data.message);
    }
  })
}, initialState);