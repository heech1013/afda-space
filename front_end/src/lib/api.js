import axios from 'axios';
// import queryString from 'query-string';

export const getPostList = (userId) => axios.get(`/api/post?userId=${userId}`);