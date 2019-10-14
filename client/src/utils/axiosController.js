import axios from 'axios';
import { RESOURCE_BASE } from "../config/config";

class AxiosController {
    setBaseUrl = () => axios.defaults.baseURL = RESOURCE_BASE + '/api';
    getAxiosInstace = () => axios;
    setAuthHeader = (token) => {
        if(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    };

    deleteToken = () => {
        localStorage.removeItem('token');
        this.setAuthHeader(null)
    };

    saveToken = token => {
        localStorage.setItem('token', token);
        this.setAuthHeader(token);
    };
}

export const axiosController = new AxiosController();
