import axios from 'axios';
// import queryString from 'query-string';

export const login = (id, expires_in) => axios.post(`/api/auth/login`, { id, expires_in });
export const join = (authId, nick, sex, age) => axios.post(`/api/auth/join`, { authId, nick, sex, age });
export const checkJWT = (token) => axios.post(`/api/auth/checkJWT`, {token});

export const getProfile = (id) => axios.get(`/api/user/${id}/profile`);
export const updateProfileCard = (id, nick, introduction) => axios.patch(`/api/user/${id}/profile`, { nick, introduction });
export const getUserContentList = (type, id) => axios.get(`/api/user/${id}/${type}`);
export const postUserDiagnosis = (id, data) => axios.post(`/api/user/${id}/diagnosis`, { data });
export const postUserSymptom = (id, symptomId) => axios.post(`/api/user/${id}/symptom`, { symptomId });
export const postUserMedicine = (id, medicineId) => axios.post(`/api/user/${id}/medicine`, { medicineId });
export const postUserMedicineDosage = (id, data) => axios.post(`/api/user/${id}/medicineDosageData`, { data });

export const getPostList = (userId) => axios.get(`/api/post?userId=${userId}`);

export const getContent = (type, id) => axios.get(`/api/${type}/${id}`);
export const getContentList = (type) => axios.get(`/api/${type}`);
export const getContentCommentList = (type, id) => axios.get(`/api/${type}/${id}/comment`);
export const getContentSymptomList = (type, id) => axios.get(`/api/${type}/${id}/symptom`);
export const getContentMedicineList = (type, id) => axios.get(`/api/${type}/${id}/medicine`);

export const deleteContent = (type, id) => axios.delete(`/api/${type}/${id}`);