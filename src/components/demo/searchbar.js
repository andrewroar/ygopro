import React, { useReducer, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import Home from "./index";
import axios from "axios";

function Searchbar() {
  const reducer = (state, action) => {
    if (action.type === "SearchBarChanges") {
      const searchterm = action.payload.toLowerCase().replace(/\s/g, "");
      return { ...state, search: searchterm };
    } else if (action.type === "getinitialData") {
      console.log(action.payload.data);
      return { ...state, cardData: action.payload.data };
    } else {
      return state;
    }
  };

  const initialState = {
    loading: true,
    searched: false,
    cardData: [],
    search: "",
    filteredData: [],
    searchType: null,
    searchMonsterType: null,
    searchSpellType: null,
    searchTrapType: null,
    type: "",
    url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=",
    error: null,
  };

  const searchAPI = async () => {
    console.log("API hitted");
    console.log(state.url + state.search);
    try {
      let { data } = await axios.get(state.url + state.search);

      dispatch({ type: "getinitialData", payload: data });
    } catch (err) {
      dispatch({ type: "CatchError", payload: "error" });
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex">
      <div className="search-div box-shadow">
        <form
          className="search-form "
          name="formname"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            placeholder="Enter card's name, then enter"
            className="SearchInput search-component"
            onChange={(element) => {
              const target = element.target.value;
              console.log(target);

              dispatch({
                type: "SearchBarChanges",
                payload: target,
              });

              //dispatch({ type: "changeSearchState", payload: true });
            }}
            onKeyDown={async (element) => {
              if (element.keyCode == 13) {
                console.log(state.search);
                searchAPI();
              }
            }}
          />
        </form>
      </div>
      {state.loading ? (
        <h2 style={{ "text-align": "center" }}>Loading...</h2>
      ) : null}

      {state.error === "error" ? (
        <h2 style={{ "text-align": "center" }}>There is an Error</h2>
      ) : null}
      {(state.cardData.length === 0) & (state.searched === true) ? (
        <h2 style={{ "text-align": "center" }}>No Card is found</h2>
      ) : null}

      <div className="main-list">
        {state.cardData.map((item) => {
          return (
            <Home
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

export default Searchbar;
