import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";

import Card from "./card";
import axios from "axios";

import Backbutton from "./backbutton";

function CardContainer() {
  let initialState = { cardData: [], error: null };
  const reducer = (state, action) => {
    if (action.type === "getinitialData") {
      return { ...state, cardData: action.payload.data };
    } else {
      return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  //////////////////////////Requesting from API///////////////////////////////

  const searchAPI = async () => {
    try {
      let { data } = await axios.get(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php?"
      );
      dispatch({ type: "getinitialData", payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "CatchError", payload: "error" });
    }
  };

  useEffect(() => {
    searchAPI();
  }, []);

  ////////////////Filter the database by the given card ID/////////////////////////

  const { id } = useParams();
  const selectedCard = state.cardData.filter((element) => {
    return element.id == parseInt(id);
  });

  //////////////////////////////////////////

  return (
    <div>
      {selectedCard.map((item) => {
        return (
          <div class="flex-column">
            <Backbutton />

            <Card
              name={item.name}
              desc={item.desc}
              type={item.type}
              race={item.race}
              image_url={item.card_images[0].image_url}
              card_set={item.card_sets}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CardContainer;
