import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <>
      <Hero
        title={"learn More About Us | One-Healthcare Limited Corp."}
        imageUrl={"/about.png"}
      />
      <Biography imageurl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
