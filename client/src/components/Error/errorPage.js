import React from "react";
import "./error.css";
import { BsArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <h1>404</h1>
      <h2>
        There's <b>NOTHING</b> here...
      </h2>
      <h5>
        ...maybe the page you're looking for is not found or never existed.
      </h5>
      <NavLink className="backBtn" to="/">
        Back to Home <BsArrowRight />
      </NavLink>
    </div>
  );
};

export default Error;
