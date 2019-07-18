import axios from 'axios';
// import queryString from 'query-string';

export const login = (id, expires_in) => axios.post(`/api/auth/login`, { id, expires_in });
export const join = (authId, nick, sex, age) => axios.post(`/api/auth/join`, { authId, nick, sex, age });
export const checkJWT = (token) => axios.post(`/api/auth/checkJWT`, {token});

export const getProfile = (id) => axios.get(`/api/user/${id}/profile`);

export const getPostList = (userId) => axios.get(`/api/post?userId=${userId}`);

export const getContent = (type, id) => axios.get(`/api/${type}/${id}`);
export const getContentList = (type) => axios.get(`/api/${type}`);
export const getContentCommentList = (type, id) => axios.get(`/api/${type}/${id}/comment`)
export const getContentSymptomList = (type, id) => axios.get(`/api/${type}/${id}/symptom`);
export const getContentMedicineList = (type, id) => axios.get(`/api/${type}/${id}/medicine`);