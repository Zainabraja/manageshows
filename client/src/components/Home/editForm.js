import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaStar } from "react-icons/fa";
import { FcSupport } from "react-icons/fc";

const FormModal = (props) => {
  const data = props.data.data;
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [show, setShow] = useState({
    title: data.title,
    app: data.app,
    rating: data.rating,
    review: data.review,
  });
  const [errors, setErrors] = useState({});

  const Ratings = () => {
    return [...Array(5)].map((x, i) => {
      const stars = i + 1;
      return (
        <FaStar
          key={i}
          style={{ marginRight: "5px" }}
          size={35}
          color={stars <= (userRating || hover) ? "#ff4545" : "D3D3D3"}
          onMouseEnter={() => setHover(stars)}
          onMouseLeave={() => setHover(0)}
          onClick={() => {
            setUserRating(stars);
            setShow({ ...show, rating: stars });
          }}
        ></FaStar>
      );
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setShow({ ...show, [name]: value });
  };

  const findFormErrors = () => {
    const { app } = show;
    const newErrors = {};
    if (!app || app === "") newErrors.app = "Please enter an app!";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, app, rating, review } = show;

    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const res = await fetch("/updateshow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, app, rating, review }),
      });
      const data = await res.json();
      if (data) {
        props.onHide();
        setShow({});
        window.location.reload();
      }
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Show Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Modal.Title
          className="text-center mb-4"
          style={{ textTransform: "uppercase" }}
          id="contained-modal-title-vcenter"
        >
          "{data.title}"
        </Modal.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Streaming App</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg. Netflix"
              name="app"
              value={show.app}
              onChange={handleChange}
              isInvalid={!!errors.app}
            />
            <Form.Control.Feedback type="invalid">
              {errors.app}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <br />
            <Ratings />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="review"
              value={show.review}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="col-3"
          style={{ marginRight: "15px" }}
          variant="dark"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const EditForm = (args) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 50 }}
        overlay={
          <Tooltip className="show" id="button-popup">
            Edit Show Details
          </Tooltip>
        }
      >
        <Button onClick={() => setModalShow(true)}>
          <FcSupport className="update-icons" size={25} />
        </Button>
      </OverlayTrigger>
      <FormModal
        show={modalShow}
        data={args}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default EditForm;
