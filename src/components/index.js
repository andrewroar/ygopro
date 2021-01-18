import React, { useReducer } from "react";
import Searchbar from "./searchbar";

import { Link, useRouteMatch, useParams } from "react-router-dom";

function Home(props) {
  return (
    <div className="main-box box-shadow">
      <div>
        <img
          src={props.image}
          alt={props.name + " icon"}
          class="searchpage-card-img"
          style={{ margin: "20px", width: "100px", height: "200px" }}
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
