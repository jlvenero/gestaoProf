import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Class from "../pages/class";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/classroom" element={<Class />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
