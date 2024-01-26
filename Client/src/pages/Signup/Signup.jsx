import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userServices";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './Signup.scss'
import logo from "../../img/logo192.png"
function Signup() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidCheck = {
    isValidEmail: true,
    isValidUsername: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  }
  const [objectCheckValid, setObjectCheckValid] = useState(defaultValidCheck)

  const isValidInput = () => {
    setObjectCheckValid(defaultValidCheck);

    let reg= /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if(!email || !reg.test(email)){
      toast.warn("Please enter an valid email")
      setObjectCheckValid({...defaultValidCheck, isValidEmail:false})
      return false
    }

    if(!username){
      toast.warn("Please enter username")
      setObjectCheckValid({...defaultValidCheck, isValidUsername:false})
      return false
    }

    if(!phone){
      toast.warn("Please enter phone")
      setObjectCheckValid({...defaultValidCheck, isValidPhone:false})
      return false
    }

    if(!password){
      toast.warn("Please enter password")
      setObjectCheckValid({...defaultValidCheck, isValidPassword:false})
      return false
    }
    if( password !== confirmPassword){
      toast.warn("The re-entered password does not match")
      setObjectCheckValid({...defaultValidCheck, isValidConfirmPassword:false})
      return false
    }
    return true
  }
  const handleRegister = async () => {
    let check = isValidInput()
    if (check) {
      let response = await registerNewUser(email, username, phone, password);
      let serverData = response;
      if ( +serverData.EC === 0){
        toast.success(serverData.EM);
        history.push('/login')
      } else{
        toast.error(serverData.EM);   
      }
    }
  }
  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-6">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-12">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src={logo}
                        style={{ width: "80px" }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Register</h4>
                    </div>

                    <form>
                      <p>Please fill all information to sign up</p>

                      <div className="form-outline mb-4">
                        <label className="form-label" >
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={ event => setEmail(event.target.value)}
                          id="email"
                          className={objectCheckValid.isValidEmail ? "form-control" : "form-control is-invalid"}
                          placeholder="Enter email address"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" >
                          Username
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={ event => setUsername(event.target.value)}
                          id="username"
                          className={objectCheckValid.isValidUsername ? "form-control" : "form-control is-invalid"}
                          placeholder="Enter username"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" >
                          Phonenumber
                        </label>
                        <input
                          type="email"
                          value={phone}
                          onChange={ event => setPhone(event.target.value)}
                          id="phonenumber"
                          className={objectCheckValid.isValidPhone ? "form-control" : "form-control is-invalid"}
                          placeholder="Phone number"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" >
                          Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={ event => setPassword(event.target.value)}
                          id="password"
                          className={objectCheckValid.isValidPassword ? "form-control" : "form-control is-invalid"}
                          placeholder="Enter password"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">
                          Re-enter Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={ event => setConfirmPassword  (event.target.value)}
                          id="re-password"
                          className={objectCheckValid.isValidConfirmPassword ? "form-control" : "form-control is-invalid"}
                          placeholder="Enter password again"
                        />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary  fa-lg gradient-custom-2 mb-3"
                          type="button"
                          style={{ width: "100%" }}
                          onClick={() => handleRegister()}
                        >
                          Sign up
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Already have account?</p>
                        <NavLink to="/login">
                          <button type="button" className="btn btn-outline-danger">
                            Log In
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

export default Signup;
