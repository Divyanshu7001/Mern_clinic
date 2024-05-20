import React from "react";
import Hero from "../components/Hero.jsx";
import Biography from "../components/Biography.jsx";
import Messageform from "../components/Messageform.jsx";
import Departments from "../components/Departments.jsx";
const Home = () => {
  return (
    <>
      <Hero
        title={"Welcome to One Health website for trusted healthcare provider"}
        imageUrl={"./hero.png"}
      />
      <Biography imageurl={"/about.png"} />
      <Departments />
      <Messageform />
    </>
  );
};

export default Home;
