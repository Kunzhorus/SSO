import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userServices";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../context/UserContext";
import "./Login.scss";
import logo from "../../img/logo192.png";
function Login() {
  const { loginContext } = useContext(UserContext);

  const history = useHistory();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPasswrod] = useState("");
  const defaultValidCheck = {
    isValueLogin: true,
    isPassword: true,
  };
  const [objectCheckValid, setObjectCheckValid] = useState(defaultValidCheck);

  const handlePressEnter = (event) => {
    if (event.code === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setObjectCheckValid(defaultValidCheck);
    if (!valueLogin) {
      toast.warn("Please enter the Phone number or email");
      setObjectCheckValid({ ...defaultValidCheck, isValueLogin: false });
      return;
    }
    if (!password) {
      toast.warn("Please enter the password");
      setObjectCheckValid({ ...defaultValidCheck, isPassword: false });
      return;
    }
    let response = await loginUser(valueLogin, password);
    if (response && response.EC !== 0) {
      toast.error(response.EM);
      return;
    }
    let roles = response.DT.roles;
    let email = response.DT.email;
    let username = response.DT.username;
    let token = response.DT.access_token;
    let data = {
      isAuthenticated: true,
      token: token,
      account: { roles, email, username },
    };
    // localStorage.setItem('jwt',token)
    toast.success("Login succesfully");
    loginContext(data);
    history.push("/users");
  };

  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Manage Users Project</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src={logo} style={{ width: "80px" }} alt="logo" />
                      <h4 className="mt-1 mb-5 pb-1">Manage Users Project</h4>
                    </div>

                    <form>
                      <p>Please login to your account </p>

                      <div className="form-outline mb-4">
                        <label className="form-label">Username</label>
                        <input
                          type="email"
                          id="form2Example11"
                          className={
                            objectCheckValid.isValueLogin
                              ? "form-control"
                              : "form-control is-invalid"
                          }
                          placeholder="Phone number or email address"
                          value={valueLogin}
                          onChange={(event) =>
                            setValueLogin(event.target.value)
                          }
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          id="form2Example22"
                          className={
                            objectCheckValid.isPassword
                              ? "form-control"
                              : "form-control is-invalid"
                          }
                          placeholder="Enter password"
                          value={password}
                          onKeyUp={(event) => handlePressEnter(event)}
                          onChange={(event) => setPasswrod(event.target.value)}
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary  fa-lg gradient-custom-2 mb-3"
                          type="button"
                          style={{
                            width: "100%",
                            height: "35x",
                            border: "none",
                          }}
                          onClick={() => handleLogin()}
                        >
                          Login
                        </button>
                        <div style={{display:"flex", justifyContent:"center", marginBottom:"10px"}}>
                          <span> Or login with:</span>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              class="bi bi-facebook"
                              viewBox="0 0 16 16"
                              cursor={"pointer"}
                              color="blue"
                              style={{marginLeft:"10px"}}
                            >
                              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              class="bi bi-google"
                              viewBox="0 0 16 16"
                              cursor={"pointer"}
                              color="#4285F4"
                              style={{marginLeft:"10px"}}
                            >
                              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <a className="text-muted" href="#!">
                            Forgot password?
                          </a>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>

                        <NavLink to="/signup">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create New
                          </button>
                        </NavLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
