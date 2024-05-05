import axios from 'axios';

const axiosConfig = () => {
    let dynamicBaseURL = process.env.REACT_APP_DEV_URL
    if (process.env.NODE_ENV === 'development'){
        dynamicBaseURL = process.env.REACT_APP_DEV_URL
    } else {
        dynamicBaseURL = process.env.REACT_APP_PROD_URL
    }

    const instance = axios.create({
        baseURL: dynamicBaseURL,
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    instance.interceptors.request.use(
        async config => {
            const token = await localStorage.getItem('userToken')
                config.headers = { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            return config
        },
        error => {
            return Promise.reject(error)
        }
        );
    return instance;
};

export default axiosConfig;