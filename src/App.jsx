import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/home/home";

function App() {
  return (
    <Router>
      <Routes>
        {/* تحديد المسارات الخاصة بالصفحات */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  
  );
}

export default App;
