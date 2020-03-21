import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_STATION_LIST = 'forum/GET_STATION_LIST';
const GET_STATION = 'forum/GET_STATION';
const POST_STATION = 'forum/POST_STATION';

const GET_STATION_COMMENT_LIST = 'forum/GET_STATION_COMMENT_LIST';
const POST_STATION_COMMENT = 'forum/POST_STATION_COMMENT';

/* action creators */
export const getStationList = createAction(GET_STATION_LIST, api.getStationList);
export const getStation = createAction(GET_STATION, api.getStation);
export const postStation = createAction(POST_STATION, api.postStation);

export const getStationCommentList = createAction(GET_STATION_COMMENT_LIST, api.getStationCommentList);
export const postStationComment = createAction(POST_STATION_COMMENT, api.postStationComment);

/* initial state */
const initialState = Map({
  station: Map(),
  stationCommentList: List(),
  stationList: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_STATION,
    onSuccess: (state, action) => {
      const { station } = action.payload.data;
      return state.set('station', fromJS(station));
    }
  }),
  ...pender({
    type: GET_STATION_COMMENT_LIST,
    onSuccess: (state, action) => {
      const { stationCommentList } = action.payload.data;
      return state.set('stationCommentList', fromJS(stationCommentList));
    }
  }),
  ...pender({
    type: GET_STATION_LIST,
    onSuccess: (state, action) => {
      const { stationList } = action.payload.data;
      return state.set('stationList', fromJS(stationList));
    }
  })
}, initialState);