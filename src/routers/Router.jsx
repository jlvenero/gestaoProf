import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Class from "../pages/class";
import Login  from "../pages/login";
import SignIn  from "../pages/signin";
import NewStudent from "../pages/new_student";
import Home from "../pages/home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/classroom" element={<Class />} />
        <Route path="/newstudent" element={<NewStudent />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
