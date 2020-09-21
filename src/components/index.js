import React, { useReducer } from "react";
import Searchbar from "./searchbar";

import { Link, useRouteMatch, useParams } from "react-router-dom";

function Home(props) {
  console.log(props.image);
  return (
    <div className="main-box box-shadow">
      <div>
        <img
          src={props.image}
          class="card-img"
          alt={props.name + " icon"}
          style={{ margin: "20px" }}
        ></img>
      </div>
      <div>
        <h2>{props.name}</h2>
        <Link to={"/card/" + props.id}>
          <button data-id={props.id} data-name={props.name}>
            More information
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
