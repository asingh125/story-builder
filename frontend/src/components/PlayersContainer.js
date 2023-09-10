import "../styles/App.css";
import React from "react";


const PlayersContainer = props =>  {


  return (

    <div className="col-2 bgc-secondary mh-100">
      
      <div className="text-center d-flex flex-column align-content-center  rounded mt-5 h-100">

        <h1>Authors</h1>
        
        <div className="mt-5 transition-animation">

          <div className="player-scoreboard mb-3" >
            <h4 className='nickname m-0'>Hello</h4> 
          </div>

          <div className="player-scoreboard mb-3">
            <h4 className='nickname m-0'>Hello</h4> 
          </div>

          <div className="player-scoreboard mb-3">
            <h4 className='nickname m-0'>Hello</h4> 
          </div>
        </div>


        <div className='h-100 d-flex text-code text-secondary'>
          <span>Title: xxxxxxxxxxx</span>
        </div>

      </div>
      <div>
        
      </div>
    </div>


  );
}

export default PlayersContainer;
