import React from "react";

const Biography = ({ imageurl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageurl} alt="About-image" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who are we?</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam est
          eius vel dicta animi culpa, aliquid voluptate facere commodi
          laudantium voluptatibus modi ad sapiente. Soluta aliquam, voluptatum
          fugiat illo omnis, maiores autem in placeat dolor officia aut!
          Tempora, adipisci distinctio provident voluptatem consequuntur id
          repudiandae reprehenderit, nam, similique autem maxime!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
          quae pariatur nostrum fugiat quibusdam, enim cum quam ad? Vel
          perferendis rem illo totam laborum perspiciatis amet, earum suscipit
          esse! Non velit neque est quasi magni.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          vitae.
        </p>
        <p>Lorem, ipsum dolor.</p >
      </div>
    </div>
  );
};

export default Biography;
