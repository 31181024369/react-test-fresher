
import axios from '../utils/axios-customize';
const callRegister=(fullname,email,password,phone)=>{
    return axios.post('/api/v1/user/register',{fullname,email,password,phone});
}
const callLogin=(username,password)=>{
    return axios.post('/api/v1/auth/login',{username,password});
}
const callFetchAccount=()=>{
    return axios.get('/api/v1/auth/account');
}
const callLogout=()=>{
    return axios.get('/api/v1/auth/logout');
}
const fetchListUser=(query)=>{
    return axios.get(`/api/v1/users?${query}`);
}
const callCreateAUser=(name,email,password,address)=>{
    return axios.post(`/api/v1/users`,{name,email,password,address});
}
const callBulkCreateUser = (data) =>{
    return axios.post('/api/v1/user/bulk-create', data)
}
export {
    callRegister,
    callLogin,
    callFetchAccount,
    callLogout,
    fetchListUser,
    callCreateAUser,
    callBulkCreateUser
}