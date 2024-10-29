import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Class from "../pages/class";
import Login  from "../pages/login";
import SignIn  from "../pages/signin";
import NewStudent from "../pages/new_student";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/classroom" element={<Class />} />
        <Route path="/new_student" element={<NewStudent />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
