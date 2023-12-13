import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addContact } from "../redux/features/ContactSlice";

let initialFormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
};

const NewContact = () => {
  const [formDetails, setFormDetails] = useState(initialFormValues);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addContact(formDetails));
    navigate("/");
  };

  return (
    <>
      <div className="form-wrapper">
        <div className="form-container">
          <h1>Add a contact</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              pattern="[6-9]{1}[0-9]{9}"
              placeholder="Please enter a valid 10 digit phone number"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address: (City, State)"
              onChange={handleChange}
              required
            />
            <div className="btn">
              <Link to="/">
                <button className="back">
                  {/* <FaCaretLeft /> */}
                  Back
                </button>
              </Link>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="settings home" onClick={() => navigate("/")}>
        <AiFillHome />
      </div>
    </>
  );
};

export default NewContact;
