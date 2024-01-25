import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../components/Home/Home";
import { Switch, Route } from "react-router-dom";
import Role from "../components/Roles/Role";
import GroupRole from "../components/GroupRole/GroupRole";
import Code from "../components/Code/Code";
import WeatherState from "../components/About/WeatherState";
function AppRoutes() {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />
        <Route path="/code">
          <Code />
        </Route>
        <Route path="/about">
          <WeatherState />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        {/* <Route path="/login">
          <Login />
        </Route> */}
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default AppRoutes;
