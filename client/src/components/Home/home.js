import React, { useState, useEffect } from "react";
import "./home.css";
import Accordion from "react-bootstrap/Accordion";
import { FaStar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { SiHey } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "./createForm";
import EditForm from "./editForm";
import DeleteModal from "./deleteModal";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    shows: [],
  });

  let data;
  const callManage = async () => {
    try {
      const res = await fetch("/manage", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      data = await res.json();
      console.log(data);
      if (data.email === undefined || data.name === undefined) {
        navigate("/");
      }
      setUserData(data);
    } catch (e) {
      console.log(e);
      navigate("/");
    }
  };

  useEffect(() => {
    callManage();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (e) {
      console.log(e);
      navigate("/");
    }
  };

  return (
    <div className="home">
      <Button
        size="lg"
        variant="dark"
        className="mt-5 logout"
        onClick={handleLogout}
      >
        Logout <FiLogOut className="iconlogout" />
      </Button>
      <h1>
        <span style={{ fontSize: "4rem" }}>Hello,</span> {userData.name}{" "}
        <SiHey className="mb-4" size={60} />
      </h1>
      {userData.shows.length > 0 ? (
        <div>
          <h4 className="text-mute">
            Here's a list all the shows you've watched!
          </h4>
          {userData.shows.map((item, i) => {
            return (
              <Accordion style={{ width: "40rem", marginBottom: "1rem" }}>
                <Accordion.Item eventKey={i}>
                  <Accordion.Header className="header">
                    {userData.shows[i].title}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="left">
                      <div>Streaming app: {userData.shows[i].app}</div>
                      <div>
                        Rating:
                        {[...Array(5)].map((x, j) => {
                          const stars = j + 1;
                          return (
                            <FaStar
                              key={j}
                              size={23}
                              style={{ marginLeft: "5px" }}
                              color={
                                stars <= userData.shows[i].rating
                                  ? "#ff4545"
                                  : "D3D3D3"
                              }
                            ></FaStar>
                          );
                        })}
                      </div>
                      <div>Review: "{userData.shows[i].review}"</div>
                    </div>
                    <div className="right">
                      <EditForm data={userData.shows[i]} />
                      <DeleteModal
                        id={userData.shows[i]._id}
                        title={userData.shows[i].title}
                        email={userData.email}
                      />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            );
          })}
          <div className="myform d-grid gap-2">
            <Form email={userData.email} />
          </div>
        </div>
      ) : (
        <Form email={userData.email} />
      )}
    </div>
  );
};

export default Home;
