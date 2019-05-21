import axios from 'axios';
// import queryString from 'query-string';

export const getPostList = (userId) => axios.get(`/api/post?userId=${userId}`);

export const getDiagnosisList = () => axios.get(`/api/diagnosis`);
export const getDiagnosisSummary = (diagnosisId) => axios.get(`/api/diagnosis/${diagnosisId}/summary`);

export const getMedicineList = () => axios.get(`/api/medicine`);

export const getCenterList = () => axios.get(`/api/center`);