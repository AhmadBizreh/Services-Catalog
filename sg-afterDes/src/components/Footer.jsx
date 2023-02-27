import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
     
        <div className="container grid1">
          {/* <div className="box">
            <img src="./assets/logo1.png" alt="" /> 
            
           
            <br />
          </div> */}

          <div className="box">
            <h2>Quick Links</h2>
            <ul>
              <li>
                {" "}
                <a href="/"> Home </a>
              </li>
              <li>
                {" "}
                <a href="/tv"> Categories </a>{" "}
              </li>
              <li>
                {" "}
                <a href="/tv"> Feed </a>{" "}
              </li>
            </ul>
          </div>

          <div className="box">
            <h2>Recent Post</h2>
            <div className="text">
              <p>3 WooCommerce Plugins to Boost Sales</p>
              <span> 28 Feb 2022</span>
            </div>
            <div className="text">
              <p>3 WooCommerce Plugins to Boost Sales</p>
              <span> 28 Feb 2022</span>
            </div>
            <div className="text">
              <p>3 WooCommerce Plugins to Boost Sales</p>
              <span> 28 Feb 2022</span>
            </div>
          </div>

          <div className="box">
            <h2>Get in Touch</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
            <div className="icon">
             
              <label>Location: Muhajreen St, Damascus, DA 10002, Syria</label>
            </div>
            <div className="icon">
              
              <label>Phone:+963 914799584</label>
            </div>
            <div className="icon">
              
              <label>Email:support@SC.com</label>
            </div>
          </div>

          
        </div>

        <br />
        <br />
        <div style={{textAlign:"center" ,paddingRight:"10%" ,paddingLeft:"10%", }} >
        <p>
              The Integrated Services Catalog is a website that helps in
              reducing the difficulties faced by service requester in
              communicating the ideas they need in order to obtain the
              appropriate service by providing a catalog to index and classify
              services so that the service requester can access correctly
              according to his need as he can browse and view the main
              categories and sub-categories for them and with The possibility of
              browsing in posts related to each category he chooses, as they are
              published by service providers, and the requesting person can
              communicate through a real-time conversation with the publisher of
              the post to be agreed between them through a contract provided by
              the service provider with the approval of the requester. The site
              also provides a chat-bot for people who do not know the principle
              of general classification to provide them the right path so that
              they can reach the right suppliers for their needs.
            </p>
            
        </div>
       

        

        <div className="legal container">
          <p>
            Copyright <span className="fontcursive"> @2022</span> All Rights
            Reserved.
          </p>
          <label>
            Designed & Developed For <span className="fontcursive"> AIU </span>
          </label>
        </div>

        
      </footer>
    </>
  );
};

export default Footer;
