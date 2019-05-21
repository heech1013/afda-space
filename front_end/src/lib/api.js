import axios from 'axios';
// import queryString from 'query-string';

export const getPostList = () => axios.get(`/api/post`);