import "./Nav.scss";
import { NavLink } from "react-router-dom";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../services/userServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/accountAction";
function NavHeader() {
  const user = useSelector(state => state.account.userInfo)

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch()

  const handleLogin = () => {
    window.location.href =`${import.meta.env.VITE_REACT_APP_BACKEND_HOST}/login?serviceURL=${import.meta.env.VITE_REACT_CLIENT_URL}`
  }

  const handleLogout = () => {
    dispatch(doLogout())
    history.push("/")
  };

  if ((user && user.access_token) || location.pathname === "/") {
    return (
      <>
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="#home">React</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/about" exact className="nav-link">
                    About
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to="/roles" className="nav-link">
                    Roles
                  </NavLink>
                  <NavLink to="/group-role" className="nav-link">
                    Group-Role
                  </NavLink>
                </Nav>

                <Nav>
                  {user && user.access_token ? (
                    <>
                      <Nav.Item className="nav-link">
                        Welcome {user.username} !
                      </Nav.Item>
                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item>Change Password</NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => handleLogout()}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    // <NavLink to="/login" className="nav-link">
                    //   Login
                    // </NavLink>
                    <div className="nav-link" style={{cursor:"pointer"}} onClick={() => handleLogin()}>
                      Login
                    </div>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default NavHeader;
