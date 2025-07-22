
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
export {
    callRegister,
    callLogin,
    callFetchAccount,
    callLogout
}