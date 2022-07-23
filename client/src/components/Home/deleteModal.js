import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FcFullTrash } from "react-icons/fc";

const handleSubmit = async (id, email, title) => {
  console.log(id, email, title);

  const res = await fetch("/deleteshow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, email, title }),
  });

  const data = await res.json();
  if (data) {
    window.location.reload();
  }
};

const DeleteModal = (args) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id, email, title } = args;

  return (
    <>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 50 }}
        overlay={
          <Tooltip className="show" id="button-popup">
            Delete Show
          </Tooltip>
        }
      >
        <Button onClick={handleShow}>
          <FcFullTrash className="update-icons" size={25} />
        </Button>
      </OverlayTrigger>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Show</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>"{title}"</b> from your list?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleSubmit(id, email, title);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
