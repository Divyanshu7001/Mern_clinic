import React from "react";
import AppointmentForm from "../components/AppointmentForm.jsx";
import Hero from "../components/Hero.jsx";

const Appointment = () => {
  return (
    <>
      <Hero
        title={
          "Get Your Check up done with One Appointment | One-Healthcare limited"
        }
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
