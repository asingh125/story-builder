/* eslint-disable */
import React, {useEffect} from "react";
import {Button} from '@material-ui/core'; //importing material ui component
import {TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GuessView from "./components2/GuessView";
import JoinView from "./components2/JoinView";
import NavBar from "./components2/NavBar";
import { createTheme, ThemeProvider, Typography } from "@material-ui/core"
import axios from 'axios'
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3000');

function App() {

  useEffect(() => {
    socket.on('messageResponse', (data) => console.log(data));
  }, [socket]);

  const mode = 1
  const colors = ["#cf1578", "#e8d21d", "#039fbe", "#b20238"]
  const theme = createTheme({
    typography: {
      fontFamily: ["Nunito", "sans-serif"].join(","),
      //fontFamily: ["Roboto Condensed", "sans-serif"].join(","),
    },
  });

  const displayView = () => {
    switch (mode) {
      case 1:
        return <GuessView colors={colors}/>
      case 2:
        return <JoinView/>
    }
  }

  // const handleSendMessage = () => {
  //   socket.emit('message', {
  //     text: "testttt",
  //     name: "AAAAARUSHI",
  //     id: `${socket.id}${Math.random()}`,
  //     socketID: socket.id,
  //   });
  // };

  // const testAPI = async () => {
  //   // const { data } = await axios.get('/gameapi/hello')
  //   const { data } = await axios.get('/hello')
  //   console.log(data)
  //   handleSendMessage()
  // }

  const join_game = () => {
    const join_msg = {
      title: "The Great Gatsby",
      player: "aarushi"
    }
    socket.emit("join", join_msg)
  }

  const add_word = () => {
    const add_word_msg = {
      title: "The Great Gatsby",
      player: "aarushi",
      word: "the"
    }
    socket.emit("word", add_word_msg)
  }

  const add_punctuation = () => {
    const add_punctuation_msg = {
      title: "The Great Gatsby",
      player: "aarushi",
      punctuation: "."
    }
    socket.emit("punctuate", add_punctuation_msg)
  }

  const end_story = () => {
    const end_story_msg = {
      title: "The Great Gatsby",
      player: "aarushi",
    }
    socket.emit("end", end_story_msg)
  }

  return (
    <div className="App">
      <NavBar/>
      <Button onClick={join_game}>Start/join a game</Button>
      <Button onClick={add_word}>Add word</Button>
      <Button onClick={add_punctuation}>Add punctuation</Button>
      <Button onClick={end_story}>End story</Button>
      

    </div>
  );
}

export default App;
