import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
// import { Provider } from "react-redux";
// import Context from './context/index.js'
// import { setUserDetails } from './store/userSlice.js'
// import {useDispatch} from 'react-redux';

const App = () => {
  return (
    <>
      <div className="text-60">
       <AppRoutes />
       <ToastContainer position="top-center" />
      </div>
     
    
    </>
  );
};

export default App;
