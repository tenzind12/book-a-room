import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1000,
});

function Landingscreen() {
  return (
    <div
      className="row m-0 justify-content-center align-items-center"
      id="landing-page"
      data-aos=""
    >
      <div className="col-md-9 text-center">
        <h2 className="text-light" data-aos="zoom-in">
          Hotel React
        </h2>
        <h3 className="text-light" data-aos="zoom-out">
          We value our customer's opinion.
        </h3>
        <Link to="/home">
          <button className="btn btn-light fw-bold">Let's Go</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
