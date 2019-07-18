import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_PROFILE = 'profile/GET_PROFILE';

/* action creators */
export const getProfile = createAction(GET_PROFILE, api.getProfile);

/* initial state */
const initialState = Map({
  profile: Map()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_PROFILE,
    onSuccess: (state, action) => {
      const { profile } = action.payload.data;
      return state.set('profile', fromJS(profile));
    }
  })
}, initialState);