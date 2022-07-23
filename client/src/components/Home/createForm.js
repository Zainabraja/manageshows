import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaStar } from "react-icons/fa";

const FormModal = (props) => {
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [show, setShow] = useState({
    title: "",
    app: "",
    rating: 0,
    review: "",
  });
  const [errors, setErrors] = useState({});

  const email = props.email;

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
    const { title, app } = show;
    const newErrors = {};
    if (!title || title === "") newErrors.title = "Please enter a title!";
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
      const res = await fetch("/addshow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, title, app, rating, review }),
      });
      const data = await res.json();
      if (data.error || !data) {
        setErrors({ title: "Title is already taken!" });
        console.log("Please try again!");
      } else {
        props.onHide();
        setErrors({ title: "" });
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
        <Modal.Title id="contained-modal-title-vcenter">Add Show</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg. Stranger Things"
              name="title"
              value={show.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
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
        <Button className="col-3" variant="dark" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ShowForm = (args) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setModalShow(true)}>
        ADD NEW TV SHOW!
      </Button>

      <FormModal
        show={modalShow}
        email={args.email}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default ShowForm;
