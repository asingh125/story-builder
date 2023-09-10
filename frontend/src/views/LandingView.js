import "../styles/App.css";
import React from "react";
import logo from "../assets/logo.png";
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import car3 from "../assets/car3.png";
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader } from 'react-bootstrap'


const LandingView = (props) => {
  return (
    <div className="App">
      <div className="container d-flex justify-content-center">
        <div className="row justify-content-center align-items-center vh-100 w-100">
          <div className="row h-50">

            <div className="col-5 d-flex flex-column justify-content-around h-100">
              <img src={logo} width={"100%"} />
              <Form.Group className="mb-3" controlId="userInfo">
                <Form.Control placeholder="Author" value={props.author} onChange={e => props.setAuthor(e.target.value)} />
                <br/>
                <Form.Control placeholder="Title" value={props.title} onChange={e => props.setTitle(e.target.value)} />
                <br/>
                {/* <Form.Label>Game Code: </Form.Label> */}
                <Button variant="success" onClick={props.handleJoin}>Join game</Button>
              </Form.Group>
              {/* <form>
                <div className="form-group">
                  <label className="text-lg" htmlFor="authorname_field">
                    Author name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="authorname_field"
                    placeholder="Enter Author name"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="titlecode_field">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titlecode_field"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success mt-4 "
                  >
                    Write
                  </button>
                </div>
              </form> */}
            </div>

            <div className="col-1"></div>


            <div className="col-5 bgc-secondary rounded ml-3 d-flex flex-column justify-content-center">
              <div className="text-center mt-2 mb-4">
                <h1>How to play</h1>
              </div>


              <div
                id="carouselExample"
                className="carousel slide d-flex justify-content-center mt-1"
                data-bs-ride="carousel"

              >
                <div className="carousel-inner w-50">
                  <div className="carousel-item active">
                    <img
                      src={car1}
                      className="d-block w-100"
                      alt="Image 1"
                    />
                    <h6>Interactive story building game where players take turns to add words to the story</h6>
                  </div>

                  <div className="carousel-item">
                    <img
                      src={car2}
                      className="d-block w-100"
                      alt="Image 2"
                    />
                    <h6>The story is then summarized in a single sentence by a LLM</h6>
                  </div>
                  <div className="carousel-item">
                    <img
                      src={car3}
                      className="d-block w-100"
                      alt="Image 3"
                    />
                    <h6>An AI returns a list of books that are related with the summarized story</h6>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExample"
                  role="button"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExample"
                  role="button"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </a>
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingView;
