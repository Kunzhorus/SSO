import { useContext } from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../services/userServices";
import { toast } from "react-toastify";

function NavHeader() {
  const { user , logoutContext} = useContext(UserContext);
  const location = useLocation();
  const history = useHistory()

  const handleLogout = async() => {
    let data = await logoutUser(); //clear cookie
    // localStorage.removeItem('jwt')// clear localstorage
    logoutContext();// cleare user in Context
    if(data && +data.EC === 0){
      toast.success(data.EM)
      history.push('/login')
    }else{
      toast.error(data.EM)
    }
  }


  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
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
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-link">
                        Welcome {user.account.username}!
                      </Nav.Item>
                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item >
                          Change Password
                        </NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => handleLogout()}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
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
