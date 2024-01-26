import axios from "axios";
import { toast } from "react-toastify";
import axiosRetry from 'axios-retry';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// config to able set cookie
instance.defaults.withCredentials = true;

//config to get token from header
let store;
export const injectStore = (_store) => {
  store = _store;
};

axiosRetry(instance, { 
  retries: 1,
  retryCondition: (error) => {
    return error.response.status === 400 || error.response.status === 405
  },
  retryDelay: (retryCount, error) => {
    return retryCount * 100
  }
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let headerToken = store.getState()?.account?.userInfo?.access_token ?? "";
    if (headerToken) {
      config.headers.Authorization = `Bearer ${headerToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error?.response?.status || 500;
    switch (status) {
      // bad request
      case 400: {
        toast.error("400 error");
        let headerToken = store.getState()?.account?.userInfo?.access_token ?? "";
        if (headerToken) {
          error.config.headers.Authorization = `Bearer ${headerToken}`;
        }
        return axios.request(error.config);
      }

      // authentication (token related issues)
      case 401: {
        toast.error("Unauthorized the user, Please login");
        return error.response.data;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("You don't have permission to acces this resource");
        return Promise.reject(error);
      }

      // not found
      case 404: {
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }
      case 500: {
        toast.error("There is an error while connecting to server");
        return Promise.reject(error);
      }
      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
    return error.response.data;
  }
);

export default instance;
