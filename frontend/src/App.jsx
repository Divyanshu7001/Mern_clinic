import React, { useContext, useEffect } from "react";
import { Context } from "./main.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Appointment from "./pages/Appointment.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Navbar from "./components/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:4000/api/v1/user/patient/me",
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     setIsAuthenticated(true);
    //     setUser(response.data.user);
    //   } catch (error) {
    //     setIsAuthenticated(false);
    //     setUser({});
    //   }
    // };
    // fetchUser();
    const isAuthenticatedFromLocalStorage =
      localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(isAuthenticatedFromLocalStorage);
  }, [isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
