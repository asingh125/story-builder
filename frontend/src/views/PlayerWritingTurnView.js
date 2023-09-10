import "../styles/App.css";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, Card, Nav, Form, Navbar, Container, Row, Col, PageHeader } from 'react-bootstrap'

import FluctuatingWordInpupt from "../components/FluctuatingWordInpupt";

const PlayerWritingTurnView = (props) => {
  const h2Ref = useRef(null);
  const [text, setText] = useState("Initial Text");
  const [marginTop, setMarginTop] = useState(0);
  const [h2Height, setH2Height] = useState(150);
  const [wordsToAdd, setWordsToAdd] = useState(Array(10).fill("hello"));

  const [word, setWord] = useState("")

  const marginDecreaseStep = 2; // Adjust this value to control the margin decrease


  // useEffect(() => {
  //   let currentIndex = 0;

  //   const interval = setInterval(() => {
  //     if (currentIndex < wordsToAdd.length) {
  //       setText((prevText) => prevText + " " + wordsToAdd[currentIndex]);
  //       currentIndex++;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 250);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [wordsToAdd]);

  // useEffect(() => {
  //   console.log('here');
  //   if (h2Ref.current.clientHeight > h2Height) {
  //     setMarginTop((prevMarginTop) => prevMarginTop - marginDecreaseStep);
  //     setH2Height(h2Ref.current.clientHeight);
  //   }
  // }, [text]); // Trigger margin adjustment when wordCount changes


  const handleWord = () => {
    props.addWord(word)
    setWord("")
  }

  const displayInput = () => {
    if (props.myTurn) {
      return <FluctuatingWordInpupt word={word} setWord={setWord} handleWord={handleWord} endStory={props.endStory}/>
    } else {
      return <></>
    }
  }

  return (
    <div className="col-12 d-flex flex-column justify-content-start vh-100 position-relative">
      {displayInput()}

      <div
        className="border rounded transition-animation"
        style={{
          marginTop: `${marginTop}rem`,
          height: `${h2Height}vh`,
        }}
      >
        <div className="p-5 roman-font-family">
          <h2 ref={h2Ref} style={{ whiteSpace: "pre-line" }}>
            {props.story}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PlayerWritingTurnView;
