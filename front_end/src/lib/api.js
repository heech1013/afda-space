import axios from 'axios';
// import queryString from 'query-string';

export const getPostList = (userId) => axios.get(`/api/post?userId=${userId}`);
export const getDiagnosisList = () => axios.get(`/api/diagnosis`);
export const getDiagnosisSummary = (diagnosisId) => axios.get(`/api/diagnosis/${diagnosisId}/summary`);