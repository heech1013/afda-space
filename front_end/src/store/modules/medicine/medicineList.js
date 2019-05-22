import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_MEDICINE_LIST = 'medicineList/GET_MEDICINE_LIST';

/* action creators */
export const getMedicineList = createAction(GET_MEDICINE_LIST, api.getMedicineList);

/* initial state */
const initialState = Map({
  medicineList: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_MEDICINE_LIST,
    onSuccess: (state, action) => {
      const { medicineList } = action.payload.data;
      return state.set('medicineList', fromJS(medicineList));
    }
  })
}, initialState);