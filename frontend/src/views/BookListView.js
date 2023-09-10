import "../styles/App.css";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader } from 'react-bootstrap'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

const BookListView = (props) => {
  const [propmt, setPrompt] = useState("You wrote a story about: ");

  const mapBooks = () => {
    return props.books.map((item) => 
    <Col>
      <Card>
        <Card.Img src={item['book_src']}/>
        <Card.Title>{item['book_title']}</Card.Title>
      </Card>
    </Col>
    )

    // const book_comps = props.books.map((item) => {
    //   <div className="col-sm-4 mt-3">
    //     <a href={item['book_url']} >

    //     <div className="card">
    //       <img className="card-img-top" src={item['book_src']} />
    //       <div className="card-body">
    //         <h3 className="card-title">{item['book_title']}</h3>
    //         <p className="card-text">
    //         </p>
    //       </div>
    //     </div>
    //       </a>
    //   </div>
    // })
    // console.log(props.books)
    // return book_comps
  }

  return (
    <>
    <h1>You wrote a story about: </h1>
    <br/>
    <br/>

    <h3>{props.summary}</h3>
    <br/>
    <br/>

    <h2>Here's other stories with a similar vibe:</h2>
    <br/>
    <br/>

      <Container fluid="md">
        <Row>
          {mapBooks()}
        </Row>
      </Container>
    </>

  );
};

export default BookListView;
