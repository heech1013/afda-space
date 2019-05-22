import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_DIAGNOSIS_SUMMARY = 'diagnosisSummary/GET_DIAGNOSIS_SUMMARY';

/* action creators */
export const getDiagnosisSummary = createAction(GET_DIAGNOSIS_SUMMARY, api.getDiagnosisSummary);

/* initial state */
const initialState = Map({
  diagnosisSummary: Map()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_DIAGNOSIS_SUMMARY,
    onSuccess: (state, action) => {
      const { diagnosisSummary } = action.payload.data;
      return state.set('diagnosisSummary', fromJS(diagnosisSummary));
    }
  })
}, initialState);