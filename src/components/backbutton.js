import React, { useReducer, useEffect } from "react";
import {
  BrowserRouter as Router,
  useParams,
  useHistory,
} from "react-router-dom";

import Card from "./card";
import axios from "axios";

function Backbutton() {
  ////History/////
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  //////////////////////////////////////////

  return (
    <div className="back-button">
      <button onClick={handleClick}>Back</button>
    </div>
  );
}

export default Backbutton;
