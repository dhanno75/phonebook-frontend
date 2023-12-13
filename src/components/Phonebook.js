import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  getContacts,
  updateContact,
} from "../redux/features/ContactSlice";
import { Card, Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSolidPhone } from "react-icons/bi";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Popover } from "antd";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Button,
} from "@mui/material";

const Phonebook = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contacts);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    const values = { id, details: { name, phone, email, address } };
    dispatch(updateContact(values));
  };

  const handleDelete = (id) => {
    dispatch(deleteContact({ id }));
  };

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const setContactData = (contact) => {
    localStorage.setItem("contactId", contact._id);
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setAddress(contact.address);
  };

  return (
    <div>
      <Container style={{ marginTop: "30px" }}>
        <h1 className="heading">Contacts</h1>
        <hr className="mb-5"></hr>

        <div className="card-container">
          {contacts.length > 0 ? (
            contacts?.map((el) => (
              <Card className="contact-card" key={el._id}>
                <Card.Body>
                  <div className="card-top">
                    <div className="card-contact-name">{el.name}</div>
                    <Popover
                      content={
                        <div className="pop">
                          <ul>
                            <li
                              onClick={() => {
                                handleClickOpen();
                                setContactData(el);
                              }}
                            >
                              <HiPencil /> <span> Edit</span>
                            </li>
                            {el._id === localStorage.getItem("contactId") ? (
                              <Dialog
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                              >
                                <DialogTitle id="responsive-dialog-title">
                                  {"Edit your note"}
                                </DialogTitle>
                                <DialogContent>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    name="title"
                                    fullWidth
                                    variant="standard"
                                  />
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Phone"
                                    type="number"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    name="text"
                                    fullWidth
                                    variant="standard"
                                    style={{ marginBottom: "6px" }}
                                  />
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    name="text"
                                    fullWidth
                                    variant="standard"
                                    style={{ marginBottom: "6px" }}
                                  />
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Address"
                                    type="text"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                    name="text"
                                    fullWidth
                                    variant="standard"
                                    style={{ marginBottom: "6px" }}
                                  />
                                </DialogContent>
                                <DialogActions>
                                  <Button autoFocus onClick={handleClose}>
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      handleClose();
                                      handleEdit(el._id);
                                    }}
                                    autoFocus
                                  >
                                    Edit
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            ) : (
                              ""
                            )}
                            <li onClick={() => handleDelete(el._id)}>
                              <HiTrash /> <span> Delete</span>
                            </li>
                          </ul>
                        </div>
                      }
                    >
                      <SlOptionsVertical className="options-icon" />
                    </Popover>
                  </div>
                  <hr></hr>
                  <div className="card-contact-details">
                    <div className="card-contact-phone">
                      <BiSolidPhone className="icon" />
                      <div>{el.phone}</div>
                    </div>
                    <div className="card-contact-email">
                      <MdEmail className="icon" />
                      <div>{el.email}</div>
                    </div>
                    <div className="card-contact-location">
                      <MdLocationOn className="icon" />
                      <div>{el.address}</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Skeleton count={10} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Phonebook;
