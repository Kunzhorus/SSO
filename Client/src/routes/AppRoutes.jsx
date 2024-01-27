import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Users from "../pages/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home/Home";
import { Switch, Route } from "react-router-dom";
import Role from "../pages/Roles/Role";
import GroupRole from "../pages/GroupRole/GroupRole";
import Code from "../pages/Code/Code";
import WeatherState from "../pages/About/WeatherState";
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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default AppRoutes;
