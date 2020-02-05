import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* action types */
const GET_PROFILE = 'profile/GET_PROFILE';
const UPDATE_PROFILE_CARD = 'profile/UPDATE_PROFILE_CARD';
const GET_USER_CONTENT_LIST = 'profile/GET_USER_CONTENT_LIST';
const UPDATE_CONTENT_ID = 'profile/UPDATE_CONTENT_ID';
const POST_USER_DIAGNOSIS = 'profile/POST_USER_DIAGNOSIS';
const POST_USER_SYMPTOM = 'profile/POST_USER_SYMPTOM';
const POST_USER_MEDICINE = 'profile/POST_USER_MEDICINE';
const POST_USER_MEDICINE_DOSAGE = 'profile/POST_USER_MEDICINE_DOSAGE';
const POST_USER_MEDICINE_PURPOSE = 'profile/POST_USER_MEDICINE_PURPOSE';
// const POST_USER_MEDICINE_EVALUATION = 'profile/POST_USER_MEDICINE_EVALUATION';

/* action creators */
export const getProfile = createAction(GET_PROFILE, api.getProfile);
export const updateProfileCard = createAction(UPDATE_PROFILE_CARD, api.updateProfileCard);
export const getUserContentList = createAction(GET_USER_CONTENT_LIST, api.getUserContentList);
export const updateContentId = createAction(UPDATE_CONTENT_ID);
export const postUserDiagnosis = createAction(POST_USER_DIAGNOSIS, api.postUserDiagnosis);
export const postUserSymptom = createAction(POST_USER_SYMPTOM, api.postUserSymptom);
export const postUserMedicine = createAction(POST_USER_MEDICINE, api.postUserMedicine);
export const postUserMedicineDosage = createAction(POST_USER_MEDICINE_DOSAGE, api.postUserMedicineDosage);
export const postUserMedicinePurpose = createAction(POST_USER_MEDICINE_PURPOSE, api.postUserMedicinePurpose);


/* initial state */
const initialState = Map({
  profile: Map(),
  contents: List(),
  contentId: '',
  error: Map({
    profileCardUpdate: null,
    userDiagnosisCreate: null,
    userSymptomCreate: null,
    userMedicineCreate: null,
    userMedicineDosageCreate: null,
    userMedicinePurposeCreate: null,
    userMedicineEvaluationCreate: null
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
    onError: (state, action) => {
      return state.setIn(['error', 'profileCardUpdate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: GET_USER_CONTENT_LIST,
    onSuccess: (state, action) => {
      const { contents } = action.payload.data;
      return state.set('contents', fromJS(contents));
    }
  }),
  [UPDATE_CONTENT_ID]: (state, action) => {
    const { payload: contentId } = action;
    return state.set('contentId', contentId);
  },
  ...pender({
    type: POST_USER_DIAGNOSIS,
    onError: (state, action) => {
      return state.setIn(['error', 'userDiagnosisCreate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: POST_USER_SYMPTOM,
    onError: (state, action) => {
      return state.setIn(['error', 'userSymptomCreate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: POST_USER_MEDICINE,
    onError: (state, action) => {
      return state.setIn(['error', 'userMedicineCreate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: POST_USER_MEDICINE_DOSAGE,
    onError: (state, action) => {
      return state.setIn(['error', 'userMedicineDosageCreate'], action.payload.response.data.message);
    }
  }),
  ...pender({
    type: POST_USER_MEDICINE_PURPOSE,
    onError: (state, action) => {
      return state.setIn(['error', 'userMedicinePurposeCreate'], action.payload.response.data.message);
    }
  })
}, initialState);