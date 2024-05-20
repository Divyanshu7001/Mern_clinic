import React, { useContext, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [nic, setNic] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/v1/user/patient/register",
        {
          firstName,
          lastName,
          phone,
          email,
          password,
          gender,
          dob,
          nic,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("isAuthenticated", true);
        setIsAuthenticated(true);
        navigateTo("/");
        setFirstName("");
        setLastName("");
        setEmail("");
        setDob("");
        setGender("");
        setNic("");
        setPhone("");
        setPassword("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component register-form">
      <h2 style={{ marginTop: "5%" }}>Sign Up</h2>
      <p>Sign up to continue</p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus quis aut
        optio ullam nihil laboriosam ratione fuga excepturi earum voluptatibus,
        obcaecati quo dicta asperiores voluptas fugiat doloremque molestiae
        molestias facere!
      </p>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number.."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type={"date"}
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter NIC no.."
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
        </div>
        <div>
          <input
            style={{ maxWidth: "50%", width: "50%" }}
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <label htmlFor="" style={{ fontSize: "1.5rem", marginTop: "5px" }}>
              Select Gender:{" "}
            </label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Register Now</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
