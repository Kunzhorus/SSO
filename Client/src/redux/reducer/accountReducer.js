import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_FAILED,
  USER_LOGOUT_SUCCESS,
} from "../action/accountAction";

const INITIAL_STATE = {
  userInfo: {
    access_token: "",
    refresh_token: "",
    username: "",
    email: "",
    roles: {},
  },
  isLoading: false,
  errMessage: "",
};

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errMessage: action.error,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.user,
        errMessage: "",
      };
    
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errMessage:""
      };
    
    case USER_LOGOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMessage: action.error,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...INITIAL_STATE, 
      };

    default:
      return state;
  }
};

export default accountReducer;
