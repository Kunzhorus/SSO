import { useContext } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function PrivateRoutes(props) {
    const user = useSelector(state => state.account.userInfo)

    if(user && user.access_token ){
      return ( 
        <>
          <Route path={props.path} component ={props.component}/>
        </>
      )
    } else{
      toast.error("Unauthorized user")
      window.location.href =`${import.meta.env.VITE_REACT_APP_BACKEND_HOST}/login?serviceURL=${import.meta.env.VITE_REACT_CLIENT_URL}`
    }
   
}

export default PrivateRoutes;