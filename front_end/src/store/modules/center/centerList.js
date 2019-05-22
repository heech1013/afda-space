import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_CENTER_LIST = 'centerList/GET_CENTER_LIST';

/* action creators */
export const getCenterList = createAction(GET_CENTER_LIST, api.getCenterList);

/* initial state */
const initialState = Map({
  centerList: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_CENTER_LIST,
    onSuccess: (state, action) => {
      const { centerList } = action.payload.data;
      return state.set('centerList', fromJS(centerList));
    }
  })
}, initialState);