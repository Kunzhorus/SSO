import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import axios from "../../Axios/customizeAxios";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { doLogin } from "../../redux/action/accountAction";
import { useDispatch, useSelector } from "react-redux";
function Code() {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const param = searchParams.get("ssoToken");

  const dispatch = useDispatch()
  const message = useSelector(state => state.account.errMessage)
  const user = useSelector(state => state.account.userInfo)
  let firstRun = useRef(true)
  useEffect(() => {
    const verify = async () => {
      const ssoToken = param;
      if (ssoToken && firstRun) {
        firstRun = false
        dispatch(doLogin(ssoToken))
      }
    };
    if(!user.access_token ){
      verify();
    }
  }, []);

  if(user && user.access_token){
    history.push("/")
  }
  return (
    <>
      <div className="container mt-5" style={{ textAlign: "center" }}>
        {message}
        <div>
          {message && (
            <span>
              Please login again: 
              <a href={`${import.meta.env.VITE_REACT_APP_BACKEND_HOST}/login?serviceURL=${import.meta.env.VITE_REACT_SERVICE_URL}`}>Login</a>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Code;
