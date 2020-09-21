import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  useParams,
  useHistory,
} from "react-router-dom";

function Card(props) {
  return (
    <div class="card-flex-box ">
      <div>
        <img src={props.image_url} class="card-img"></img>
      </div>

      <div className="card-text box-shadow">
        <h2>{props.name}</h2>
        <p>
          {props.type} ({props.race})
        </p>
        <p>{props.desc}</p>

        <h3>Released Set</h3>
        <p>Click to Check Price</p>
        <div className="release-set-list ">
          {props.card_set ? (
            props.card_set.map((element) => {
              return (
                <p className="release-set">
                  <div>
                    <a href={"https://www.ebay.co.uk/sch/" + element.set_code}>
                      {element.set_name} ({element.set_rarity})
                    </a>
                  </div>
                </p>
              );
            })
          ) : (
            <li>Not Yet Released</li>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
