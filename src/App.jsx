import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/home/home.jsx";
import UserProfilePage from './UserProfilePage.jsx'
function App() {
  return (
    <Router>
      <Routes>
        {/* تحديد المسارات الخاصة بالصفحات */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/UserProfilePage" element={<UserProfilePage />} />
        {/* <Route path="/UserProfilePage/:userId" element={<UserProfilePage />} /> */}
      </Routes>
    </Router>
  
  );
}

export default App;
