import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import BaseUrl from "../URL";
//import ServicesData from "./ServicesData";




const Services = () => {

  const [category ,setCategory] = useState([
    {
      categoryId:"",
      name:"",
      description:"",
      image:""
    }
  ])
 

  const fetchData = () => {
    return fetch(`${BaseUrl}api/CategoriesApi/showparent`)
          .then((response) => response.json())
          .then((data) => setCategory(data));
  }

  useEffect(() => {
    fetchData();
  },[])



  return (
    <>
      <section className="Services topMarign">
        <div className="container">
          <div className="heading">
            <h3>SERVICES' CATEGORIES</h3>
            <h1>Variety of Services is Offered in Our Marketplace</h1>
          </div>

          <div className="contain grid topMarign">
          {category.slice(0, 6).map((val) => {
              return (
                <div className="box">
                  <div className="img">
                    <img src={val.image} alt="" />
                  </div>
                  <div className="text">
                    <h2>{val.name}</h2>
                    <p>{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <br/>
            <br/> */}
        </div>
        <div className="topMarign">
        <Link to={"/tv"} className="viewmore-btn">
            View More
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;
