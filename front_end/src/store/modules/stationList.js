import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_STATION_LIST = 'stationList/GET_STATION_LIST';

/* action creators */
export const getStationList = createAction(GET_STATION_LIST, api.getStationList);

/* initial state */
const initialState = Map({
  stationList: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_STATION_LIST,
    onSuccess: (state, action) => {
      const { stationList } = action.payload.data;
      return state.set('stationList', fromJS(stationList));
    }
  })
}, initialState);