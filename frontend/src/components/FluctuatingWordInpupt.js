import "../styles/App.css";
import React from "react";
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader } from 'react-bootstrap'


const FluctuatingWordInpupt = (props) => {
  return (
    <Container>
      <Row>
        <Col xs={8}>      
        <Form.Group className="mb-3" controlId="wordInput">
        <Form.Control placeholder="Continue the story...                             " value={props.word} onChange={e => props.setWord(e.target.value)} />
      </Form.Group>
      </Col>
      <Col xs={2}>        <Button variant="success" onClick={props.handleWord}>Submit</Button>
  </Col>
      <Col xs={2}>
      <Button variant="danger" onClick={props.endStory}>The End</Button>

      </Col>

      </Row>

    </Container>

  );
};

export default FluctuatingWordInpupt;
