import { useContext } from "react";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
function PrivateRoutes(props) {
    let history = useHistory()
    const {user} = useContext(UserContext)

    if(user && user.isAuthenticated ){
      return ( 
        <>
          <Route path={props.path} component ={props.component}/>
        </>
      )
    } else{
      toast.error("Unauthorized user")
      history.push('/login')
    }
   
}

export default PrivateRoutes;