import React from "react";
import "../App.css";
const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          fugiat labore rem mollitia minima! Sint porro maxime est ipsam
          possimus sunt assumenda perferendis voluptatibus iure quibusdam, quod
          debitis ut molestias nostrum doloribus eius qui asperiores
          perspiciatis tempore voluptatum. A velit quidem distinctio fugiat
          voluptas aut officiis ipsam aliquam fuga ullam?
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero image" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
