import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

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
