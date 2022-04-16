import React from "react";
import "./index.scss";

const HomePage = () => {
  return (
    <section className="home">
      <div className="showcase">
        <div className="img">
          <img
            src="http://warmgun.com/wp-content/uploads/2021/10/banner-bds.png"
            alt=""
          />
        </div>
        <div className="text">
          <h1>Welcome to my website !</h1>
          <p>Please, feel free to explore what you want to find.</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
