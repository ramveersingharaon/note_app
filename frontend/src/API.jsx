import axios from 'axios';


const API = axios.create({ baseURL: "https://note-app-backend-new.onrender.com/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = localStorage.getItem('token')
    }
    return req
});
export default API;