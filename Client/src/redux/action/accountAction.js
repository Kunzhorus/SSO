import { toast } from "react-toastify";
import axios from "../../Axios/customizeAxios";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_FAILED = "USER_LOGOUT_FAILED";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export const doLogin = (ssoToken) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    let res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_HOST}/verify-token`,
      { ssoToken },
      { withCredentials: true }
    );
    if (res.EC === 0) {
      dispatch({ type: USER_LOGIN_SUCCESS, user: res.DT });
      toast.success(res.EM);
    } else {
      dispatch({ type: USER_LOGIN_FAILED, error: res.EM });
    }
  };
};

export const doLogout = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    let res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_HOST}/api/logout`,
      { withCredentials: true }
    );
    if (res.EC === 0) {
      dispatch({ type: USER_LOGOUT_SUCCESS });
      toast.success(res.EM);
    } else {
      dispatch({ type: USER_LOGOUT_FAILED, error: res.EM });
    }
  };
};

export const doGetAccount = () => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_HOST}/api/account`,
        { withCredentials: true }
      );
      console.log(res);
      if (res.EC === 0) {
        dispatch({ type: USER_LOGIN_SUCCESS, user: res.DT });
      } else {
        dispatch({ type: USER_LOGIN_FAILED, error: res.EM });
      }
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAILED, error: error.message });
      
    }
    
  };
};
