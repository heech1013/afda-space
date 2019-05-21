import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_DIAGNOSIS_LIST = 'diagnosisList/GET_DIAGNOSIS_LIST';

/* action creators */
export const getDiagnosisList = createAction(GET_DIAGNOSIS_LIST, api.getDiagnosisList);

/* initial state */
const initialState = Map({
  diagnosisList: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_DIAGNOSIS_LIST,
    onSuccess: (state, action) => {
      const { diagnosisList } = action.payload.data;
      return state.set('diagnosisList', fromJS(diagnosisList));
    }
  })
}, initialState);