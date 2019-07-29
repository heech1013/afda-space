import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const LOGIN = 'base/LOGIN';
const LOGOUT = 'base/LOGOUT';

const JOIN = 'base/JOIN';
const CHANGE_NICK_INPUT = 'base/CHANGE_NICK_INPUT';
const CHANGE_AGE_INPUT = 'base/CHANGE_AGE_INPUT';
const CHANGE_SEX_INPUT = 'base/CHANGE_SEX_INPUT';

const CHECK_JWT = 'base/CHECK_JWT';

const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';

/* action creators */
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT);

export const join = createAction(JOIN, api.join);
export const changeNickInput = createAction(CHANGE_NICK_INPUT);
export const changeAgeInput = createAction(CHANGE_AGE_INPUT);
export const changeSexInput = createAction(CHANGE_SEX_INPUT);

export const checkJWT = createAction(CHECK_JWT, api.checkJWT);

export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);

/* initial state */
const initialState =  Map({
  logged: false,
  id: null,
  auth: Map({
    token: null,
    authId: null
  }),
  joinForm: Map({
    nick: '',
    sex: 1,
    age: 1
  }),
  modal: Map({
    profileCardUpdate: false
  })
});

/* reducer */
export default handleActions({
  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => {
      const { logged, id, auth } = action.payload.data;
      return state.set('logged', logged)
                  .set('id', id)
                  .set('auth', fromJS(auth));
    }
  }),
  [LOGOUT]: (state, action) => {
    return state.set('logged', false);
  },
  ...pender({
    type: JOIN,
    onSuccess: (state, action) => {
      const { logged, id, auth } = action.payload.data;
      return state.set('logged', logged)
                  .set('id', id)
                  .set('auth', fromJS(auth));
    }
  }),
  [CHANGE_NICK_INPUT]: (state, action) => {
    const { payload: value } = action;
    return state.setIn(['joinForm', 'nick'], value);
  },
  [CHANGE_AGE_INPUT]: (state, action) => {
    const { payload: value } = action;
    return state.setIn(['joinForm', 'age'], value);
  },
  [CHANGE_SEX_INPUT]: (state, action) => {
    const { payload: value } = action;
    return state.setIn(['joinForm', 'sex'], value);
  },
  ...pender({
    type: CHECK_JWT,
    onSuccess: (state, action) => {
      const { logged, id } = action.payload.data;
      return state.set('logged', logged)
                  .set('id', id);
    }
  }),
  [SHOW_MODAL]: (state, action) => {
    const { payload: modalName } = action;
    return state.setIn(['modal', modalName], true);
  },
  [HIDE_MODAL]: (state, action) => {
    const { payload: modalName } = action;
    return state.setIn(['modal', modalName], false);
  }
}, initialState);