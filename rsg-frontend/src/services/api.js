import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('user:password')}`
    }
});

// api.interceptors.request.use(config => {
//     const authData = localStorage.getItem('authCredentials');
//     if (authData) {
//         const { username, password } = JSON.parse(authData);
//         config.auth = {
//             username,
//             password
//         };
//     }
//     return config;
// });

api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (credentials) => {
    return axios({
        method: 'post',
        url: '/api/auth/login',
        baseURL: process.env.REACT_APP_API_URL,
        data: credentials,
        timeout: 10000
    });
};
export const getAccounts = () => api.get('/api/home/accounts');
export const getTransactions = () => api.get('/api/home/transactions');
export const getExpenses = () => api.get('/api/home/expenses');
export const transferFunds = (data) => api.post('/api/transfer', data);