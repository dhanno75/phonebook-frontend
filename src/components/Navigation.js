import React from "react";
import Logo5 from "../images/logo5.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <img src={Logo5} alt="Phonebook" />
        </Link>
      </div>

      <div className="title">Phonebook</div>

      <Link to="/newContact" className="new-contact">
        New contact
      </Link>
    </div>
  );
};

export default Navigation;
