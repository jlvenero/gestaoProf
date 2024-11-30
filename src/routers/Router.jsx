import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Class from "../pages/class";
import Login  from "../pages/login";
import SignIn  from "../pages/signin";
import NewStudent from "../pages/new_student";
import Home from "../pages/home";
import NewHome from "../pages/home_new";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/classroom/:id" element={<Class />} />
        <Route path="/newstudent" element={<NewStudent />} />
        <Route path="/newHome" element={<NewHome />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
