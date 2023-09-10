import "./styles/App.css";
import React, { useState, useEffect } from "react";

import WaitingRoomView from './views/WaitingRoomView';
import PlayersContainer from './components/PlayersContainer';
import PlayerWritingTurnView from './views/PlayerWritingTurnView';
import BookListView from './views/BookListView';
import LandingView from './views/LandingView';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3000');

function App() {
  const [mode, setMode] = useState(1)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [story, setStory] = useState("")
  const [EOS, setEOS] = useState(false)
  const [turn, setTurn] = useState("")
  const [epilogue, setEpilogue] = useState(false)
  const [summary, setSummary] = useState("")
  const [myTurn, setMyTurn] = useState(false)
  const [books, setBooks] = useState([{}, {}, {}])

  useEffect(() => {
    socket.on(title, (data) => handle_msg(data));
  }, [socket, title, author]);

  const handle_msg = (msg) => {
    const type = msg['type']
    if (type == "story_update") {
      setStory(msg["story"])
      setEOS(msg["EOS"])
    } else if (type == "player_turn") {
      if (msg["player"] == author) {
        setMyTurn(true)
      } else {
        setMyTurn(false)
      }
    } else if (type == "epilogue") {
      setMode(3)
      setEpilogue(true)
      setSummary(msg["summary"])
    } else if (type == "book") {
      console.log("NEW BOOK MSG: ")
      console.log(msg)
      setBooks(msg["books"])
    }
  }

  const handleJoin = () => {
    const join_msg = {
      title: title,
      player: author
    }
    socket.emit("join", join_msg)
    setMode(2)
  }

  const addWord = (word) => {
    if (myTurn) {
      const add_word_msg = {
        title: title,
        player: author,
        word: word
      }
      socket.emit("word", add_word_msg)
    }
  }

  const add_punctuation = () => {
    const add_punctuation_msg = {
      title: "The Great Gatsby",
      player: "aarushi",
      punctuation: "."
    }
    socket.emit("punctuate", add_punctuation_msg)
  }

  const endStory = () => {
    const end_story_msg = {
      title: title,
      player: author,
    }
    socket.emit("end", end_story_msg)
  }

  const displayView = () => {
    switch (mode) {
      case 2: 
        return <PlayerWritingTurnView addWord={addWord} myTurn={myTurn} author={author} story={story} endStory={endStory}/> 
      case 3: 
        return <BookListView books={books} summary={summary}/> 
      case 1:
        return <LandingView title={title} author={author} setTitle={setTitle} setAuthor={setAuthor} handleJoin={handleJoin}/>
    }
  } 

  return (
    <div className="main-container">
      <div className="container d-flex justify-content-center">

        <div className="row justify-content-center align-items-center vh-100 w-100">

          <div className='row h-75 '>

            {displayView()}

            <div className="col-0"></div>
            {/* <PlayersContainer /> */}
          </div>

        </div>

      </div>
    </div>
    // <LandingView />
  );
}

export default App;
