import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const AppointmentForm = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [nic, setNic] = useState("");
  const [appointment_date, setAppointment_date] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor_firstName, setDoctor_firstName] = useState("");
  const [doctor_lastName, setDoctor_lastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState("");

  const departmentsArray = [
    "General",
    "Physiology",
    "Orthopedics",
    "Dermatology",
    "Cardiology",
    "Neurology",
    "ENT",
    "Pediatrics",
    "Ortho",
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/getDoctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    const hasVisitedBool = Boolean(hasVisited);
    axios
      .post(
        "http://localhost:4000/api/v1/appointment/sendAppointment",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date,
          department,
          doctor_firstName,
          doctor_lastName,
          hasVisited: hasVisitedBool,
          address,
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
        setFirstName("");
        setLastName("");
        setEmail("");
        setDob("");
        setGender("");
        setNic("");
        setPhone("");
        setAppointment_date("");
        setAddress("");
        setDepartment("");
        setDoctor_firstName("");
        setDoctor_lastName("");
        setHasVisited("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2 style={{ marginTop: "5%" }}>Book Your Appointment Now!!</h2>
        <p>Book Now,,Get your health checkup done tomorrow</p>

        <form onSubmit={handleAppointment}>
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
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointment_date}
              onChange={(e) => setAppointment_date(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctor_firstName("");
                setDoctor_lastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${doctor_firstName} ${doctor_lastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctor_firstName(firstName);
                setDoctor_lastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="5"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Book Appointment Now</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
