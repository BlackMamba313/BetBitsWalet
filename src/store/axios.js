import axios from 'axios';

const {REACT_APP_API_URL} = process.env
function customStringify(obj){
  return JSON.stringify(obj);
}


const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,

  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => customStringify(params),
});

// Интерсептор для добавления токена авторизации к каждому запросу
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Интерсептор для обработки ответов и ошибок
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error);

    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, redirecting to login...');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance ;
