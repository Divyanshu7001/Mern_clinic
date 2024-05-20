import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../main";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  console.log(isAuthenticated);
  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const gotoLogin = () => {
    navigateTo("/login");
  };

  return (
    <nav className="container ">
      <div className="logo">One-Health</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/appointment"}>Take Appointment</Link>
          <Link to={"/aboutus"}>About Us</Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            LogOut
          </button>
        ) : (
          <button className="loginBtn btn" onClick={gotoLogin}>
            LogIn
          </button>
        )}
      </div>
      <div className="hamburger" onClick={()=>setShow(!show)}>
          <GiHamburgerMenu/>
      </div>
    </nav>
  );
};

export default Navbar;
