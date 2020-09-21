import React, { useReducer, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import Home from "./index";
import axios from "axios";

function Searchbar() {
  const reducer = (state, action) => {
    if (action.type === "getinitialData") {
      return { ...state, cardData: action.payload.data, loading: false };
    } else if (action.type === "changeSearchState") {
      return { ...state, searched: true };
    } else if (action.type === "CatchError") {
      return { ...state, error: action.payload };
    } else if (action.type === "ChangeUrl") {
      if (action.payload === "Monster") {
        return {
          ...state,
          url:
            "https://db.ygoprodeck.com/api/v7/cardinfo.php?" +
            state.searchMonsterType,
        };
      } else if (action.payload === "Spell") {
        return {
          ...state,
          url:
            "https://db.ygoprodeck.com/api/v7/cardinfo.php?" +
            state.searchSpellType,
        };
      } else if (action.payload === "Trap") {
        return {
          ...state,
          url:
            "https://db.ygoprodeck.com/api/v7/cardinfo.php?" +
            state.searchSpellType,
        };
      } else {
        return {
          ...state,
          url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
        };
      }
    } else if (action.type === "SearchBarType") {
      return { ...state, searchType: action.payload };
    } else if (action.type === "SearchBarMonsterType") {
      return { ...state, searchMonsterType: action.payload };
    } else if (action.type === "SearchBarSpellType") {
      return { ...state, searchSpellType: action.payload };
    } else if (action.type === "SearchBarChanges") {
      if (action.payload !== "") {
        const filteredCard = () => {
          let finalResult = state.cardData;
          const filteredCardbyName = state.cardData.filter((element) => {
            return (
              element.name
                .toUpperCase()
                .replace(/\s/g, "")
                .indexOf(action.payload.toUpperCase().replace(/\s/g, "")) !== -1
            );
          });

          finalResult = filteredCardbyName;

          const filteredCardbyType = () => {
            if (state.searchType !== null) {
              const filteredbyType = finalResult.filter((element) => {
                return (
                  element.type.replace(/\s/g, "").indexOf(state.searchType) !==
                  -1
                );
              });

              return (finalResult = filteredbyType);
            } else {
              return (finalResult = filteredCardbyName);
            }
          };

          filteredCardbyType();

          return finalResult;
        };

        return { ...state, filteredData: filteredCard() };
      } else {
        return { ...state, filteredData: state.cardData };
      }
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
    url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?",
    error: null,
  };

  const searchAPI = async () => {
    try {
      let { data } = await axios.get(state.url);

      dispatch({ type: "getinitialData", payload: data });
    } catch (err) {
      dispatch({ type: "CatchError", payload: "error" });
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    searchAPI();
  }, []);

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
            onKeyDown={async (element) => {
              if (element.keyCode == 13) {
                state.cardData = true;
                const target = element.target.value;

                searchAPI().then(() => {
                  dispatch({
                    type: "SearchBarChanges",
                    payload: target,
                  });
                  dispatch({ type: "changeSearchState", payload: true });
                });
              }
            }}
          />
          <select
            className="search-component"
            id="searchbar-type"
            onChange={(element) => {
              dispatch({
                type: "SearchBarType",
                payload: element.target.value,
              });
            }}
          >
            <option value=""></option>
            <option value="Monster">Monster</option>
            <option value="Spell">Spell</option>
            <option value="Trap">Trap</option>
          </select>

          {state.searchType === "Monster" ? (
            <select
              id="searchbar-monster-type"
              onChange={async (element) => {
                dispatch({
                  type: "SearchBarMonsterType",
                  payload: element.target.value,
                });
                dispatch({
                  type: "ChangeUrl",
                  payload: "Monster",
                });
              }}
            >
              <option value=""></option>
              <option value="type=Normal Monster">Normal Monster</option>
              <option value="type=Normal Tuner Monster">
                Normal Tuner Monster
              </option>
              <option value="type=Effect Monster">Effect Monster</option>
              <option value="type=Tuner Monster">Tuner</option>

              <option value="type=Flip Effect Monster">
                Flip Effect Monster
              </option>

              <option value="type=Spirit Monster">Spirit Monster</option>
              <option value="type=Union Effect Monster">
                Union Effect Monster
              </option>
              <option value="type=Gemini Monster">Gemini Monster</option>
              <option value="type=Pendulum Effect Monster">
                Pendulum Effect Monste
              </option>
              <option value="type=Pendulum Normal Monster">
                Pendulum Normal Monster
              </option>
              <option value="type=Pendulum Tuner Effect Monster">
                Pendulum Tuner Effect Monster
              </option>
              <option value="type=Pendulum Flip Effect Monster">
                Pendulum Flip Effect Monster
              </option>

              <option value="type=XYZ Monster">XYZ Monster</option>
              <option value="type=XYZ Pendulum Effect Monster">
                XYZ Pendulum Effect Monster
              </option>

              <option value="type=Fusion Monster">Fusion Monster</option>
              <option value="type=Pendulum Effect Fusion Monster">
                Pendulum Effect Fusion Monster
              </option>
              <option value="type=Synchro Monster">Synchro Monster</option>
              <option value="type=Synchro Tuner Monster">
                Synchro Tuner Monster
              </option>
              <option value="type=Synchro Pendulum Effect Monster">
                Synchro Pendulum Effect Monster
              </option>
              <option value="type=Ritual Monster">Ritual Monster</option>
              <option value="type=Ritual Effect Monster">
                Ritual Effect Monster
              </option>
              <option value="type=Link Monster">Link Monster</option>
            </select>
          ) : null}

          {state.searchType === "Spell" ? (
            <select
              id="searchbar-spell-type"
              onChange={async (element) => {
                dispatch({
                  type: "SearchBarSpellType",
                  payload: element.target.value,
                });
                dispatch({
                  type: "ChangeUrl",
                  payload: "Spell",
                });
              }}
            >
              <option value=""></option>
              <option value="race=equip">Equip</option>
              <option value="race=continuous">Continuous</option>
              <option value="race=quick-play">Quick-Play</option>
              <option value="race=ritual">Ritual</option>
              <option value="type=field">Field</option>
            </select>
          ) : null}

          {state.searchType === "Trap" ? (
            <select
              id="searchbar-spell-type"
              onChange={async (element) => {
                dispatch({
                  type: "SearchBarSpellType",
                  payload: element.target.value,
                });
                dispatch({
                  type: "ChangeUrl",
                  payload: "Spell",
                });
              }}
            >
              <option value=""></option>
              <option value="race=continuous">Continuous</option>
              <option value="race=counter">Counter</option>
            </select>
          ) : null}
        </form>
      </div>
      {state.loading ? (
        <h2 style={{ "text-align": "center" }}>Loading...</h2>
      ) : null}

      {state.error === "error" ? (
        <h2 style={{ "text-align": "center" }}>There is an Error</h2>
      ) : null}
      {(state.filteredData.length === 0) & (state.searched === true) ? (
        <h2 style={{ "text-align": "center" }}>No Card is found</h2>
      ) : null}

      <div className="main-list">
        {state.filteredData.map((item) => {
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
