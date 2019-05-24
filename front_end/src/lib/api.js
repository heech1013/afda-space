import axios from 'axios';
// import queryString from 'query-string';

export const getPostList = (userId) => axios.get(`/api/post?userId=${userId}`);

export const getContent = (type, id) => axios.get(`/api/${type}/${id}`);
export const getContentList = (type) => axios.get(`/api/${type}`);
export const getContentSymptomList = (type, id) => axios.get(`/api/${type}/${id}/symptom`);