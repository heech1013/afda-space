import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_CONTENT = 'content/GET_CONTENT';
const GET_DIAGNOSIS_LIST = 'content/GET_DIAGNOSIS_LIST';
const GET_SYMPTOM_LIST = 'content/GET_SYMPTOM_LIST';
const GET_MEDICINE_LIST = 'content/GET_MEDICINE_LIST';
const GET_CONTENT_SYMPTOM_LIST = 'content/GET_CONTENT_SYMPTOM_LIST';
const GET_CONTENT_MEDICINE_LIST = 'content/GET_CONTENT_MEDICINE_LIST';
const DELETE_CONTENT = 'content/DELETE_CONTENT';

/* action creators */
export const getContent = createAction(GET_CONTENT, api.getContent);
export const getDiagnosisList = createAction(GET_DIAGNOSIS_LIST, api.getDiagnosisList);
export const getSymptomList = createAction(GET_SYMPTOM_LIST, api.getSymptomList);
export const getMedicineList = createAction(GET_MEDICINE_LIST, api.getMedicineList);
export const getContentSymptomList = createAction(GET_CONTENT_SYMPTOM_LIST, api.getContentSymptomList);
export const getContentMedicineList = createAction(GET_CONTENT_MEDICINE_LIST, api.getContentMedicineList);
export const deleteContent = createAction(DELETE_CONTENT, api.deleteContent);


/* initial state */
const initialState = Map({
  content: Map(),
  diagnosisList: List(),
  symptomList: List(),
  medicineList: List(),
  contentSymptomList: List(),
  contentMedicineList: List()
});

/* reducer */
export default handleActions({
  ...pender({
    type: GET_CONTENT,
    onSuccess: (state, action) => {
      const { content } = action.payload.data;
      return state.set('content', fromJS(content));
    }
  }),
  ...pender({
    type: GET_DIAGNOSIS_LIST,
    onSuccess: (state, action) => {
      const { contentList } = action.payload.data;
      return state.set('diagnosisList', fromJS(contentList));
    }
  }),
  ...pender({
    type: GET_SYMPTOM_LIST,
    onSuccess: (state, action) => {
      const { contentList } = action.payload.data;
      return state.set('symptomList', fromJS(contentList));
    }
  }),
  ...pender({
    type: GET_MEDICINE_LIST,
    onSuccess: (state, action) => {
      const { contentList } = action.payload.data;
      return state.set('medicineList', fromJS(contentList));
    }
  }),
  ...pender({
    type: GET_CONTENT_SYMPTOM_LIST,
    onSuccess: (state, action) => {
      const { contentSymptomList } = action.payload.data;
      return state.set('contentSymptomList', fromJS(contentSymptomList));
    }
  }),
  ...pender({
    type: GET_CONTENT_MEDICINE_LIST,
    onSuccess: (state, action) => {
      const { contentMedicineList } = action.payload.data;
      return state.set('contentMedicineList', fromJS(contentMedicineList));
    }
  })
}, initialState);