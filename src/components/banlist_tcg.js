import React, { useReducer, useEffect } from "react";
import {
  BrowserRouter as Router,
  useParams,
  useHistory,
} from "react-router-dom";
import Index from "./index";

import axios from "axios";

function Banlist_tcg() {
  //////////////////////////////////////////
  const initialState = {
    loading: true,
    searched: false,
    cardData: [],
    url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg",
    error: null,
  };

  const reducer = (state, action) => {
    if (action.type === "getinitialData") {
      return { ...state, cardData: action.payload.data, loading: false };
    } else if (action.type === "changeSearchState") {
      return { ...state, searched: true };
    } else if (action.type === "CatchError") {
      return { ...state, error: action.payload };
    } else {
      return state;
    }
  };

  const searchAPI = async () => {
    try {
      let { data } = await axios.get(state.url);

      dispatch({ type: "getinitialData", payload: data });
    } catch (err) {
      dispatch({ type: "CatchError", payload: "error" });
    }
  };

  useEffect(() => {
    searchAPI();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  var order = [
    "Normal Monster",
    "Effect Monster",
    "Fusion Monster",
    "Synchro Monster",
    "Link Monster",
    "Spell",
    "Trap",
  ];

  return (
    <div class="flex">
      <div className="main-list">
        <div className="Banline">
          <h1>Banned</h1>
        </div>
        {state.cardData
          .filter((element) => {
            return element.banlist_info.ban_tcg === "Banned";
          })
          .map((item) => {
            return (
              <Index
                name={item.name}
                id={item.id}
                image={item.card_images[0].image_url_small}
              />
            );
          })}
      </div>

      <div className="main-list">
        <div className="Banline-2">
          <h1>Limited</h1>
        </div>
        {state.cardData
          .filter((element) => {
            return element.banlist_info.ban_tcg === "Limited";
          })
          .map((item) => {
            return (
              <Index
                name={item.name}
                id={item.id}
                image={item.card_images[0].image_url_small}
              />
            );
          })}
      </div>

      <div className="main-list">
        <div className="Banline-3">
          <h1>Semi-Limited</h1>
        </div>
        {state.cardData
          .filter((element) => {
            return element.banlist_info.ban_tcg === "Semi-Limited";
          })
          .map((item) => {
            return (
              <Index
                name={item.name}
                id={item.id}
                image={item.card_images[0].image_url_small}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Banlist_tcg;
