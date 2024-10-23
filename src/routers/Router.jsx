import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Class from "../pages/class";
import Login  from "../pages/login";
import SignIn  from "../pages/signin";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/classroom" element={<Class />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
