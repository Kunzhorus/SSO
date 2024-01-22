import NavHeader from "./components/Navigation/Nav";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccount } from "./redux/action/accountAction";
import { useEffect } from "react";
function App() {
  const isLoading = useSelector((state) => state.account.isLoading);
  const user = useSelector((state) => state.account.userInfo);
  const dispatch = useDispatch();
  const excludedPaths = ["/", "/login", "/code"];

  useEffect(() => {
    if (!excludedPaths.includes(window.location.pathname)) { 
      dispatch(doGetAccount());
    }
  }, []);
  
  return (
    <>
      <Router>
        {isLoading ? (
          <div className="loading-container">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <>
            <div className="App-header">
              <NavHeader />
            </div>

            <div className="App">
              <AppRoutes />
            </div>
          </>
        )}
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
