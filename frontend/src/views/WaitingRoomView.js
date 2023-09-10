import "../styles/App.css";
import React from "react";

const WaitingRoomview = (props) => {

  return (
    <div className="col-9 d-flex flex-column justify-content-around h-100 border rounded">
      <div className="row justify-content-center align-items-center vh-100 w-100">
        <div className="col-1"></div>

        <div className="col-5">
          <h1>
            Waiting for <br /> players...
          </h1>
          <button type="submit" className="btn btn-success text-success mt-4 ">
            Submit
          </button>
        </div>

        <div className="col-4"></div>
      </div>
    </div>
  );
};

export default WaitingRoomview;
