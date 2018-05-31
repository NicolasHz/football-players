import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://football-players-b31f2.firebaseio.com/'
});

export default axiosInstance;