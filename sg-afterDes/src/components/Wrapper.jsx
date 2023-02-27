import React from "react";
import { Link } from "react-router-dom";

const Wrapper = () => {
  const data = [
    {
      title: "LOOKING  FOR  A  CERTAIN  SERVICE ?",
      heading: "Get Your Business Done By a Suitable Freelancer",
      desc: "Learn More About Our Policies And How It's Simple To Find What Your Looking For..",
    },
  ];
  return (
    <>
      <section className="Branding wrapper">
        <div className="container">
          {data.map((value) => {
            return (
              <div className="box">
                <h3>{value.title}</h3>
                <h2>{value.heading}</h2>
                <p>{value.desc}</p>
                <Link to={"/about"} className="primary-btn">
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Wrapper;
