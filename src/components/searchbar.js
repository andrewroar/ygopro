import React, { useReducer, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import Home from "./index";
import axios from "axios";

function Searchbar() {
  const reducer = (state, action) => {
    if (action.type === "getinitialData") {
      console.log(action.payload.data);
      return { ...state, cardData: action.payload.data, loading: false };
    } else if (action.type === "changeSearchState") {
      return { ...state, searched: true };
    } else if (action.type === "CatchError") {
      return { ...state, error: action.payload };
    } else if (action.type === "ChangeUrl") {
      if (action.payload === "Monster") {
        const monsterurl =
          "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=&" +
          state.searchMonsterType +
          `&` +
          state.monsteratkreq +
          state.monsteratk +
          state.monsterdefreq +
          state.monsterdef +
          state.monsterattribute +
          state.monstertype +
          state.monsterscale +
          state.monsterlink +
          state.monsterlevel +
          state.monstersort;
        return { ...state, url: monsterurl };
      } else if (action.payload === "Spell") {
        return {
          ...state,
          url:
            "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Spell Card&" +
            state.searchSpellType,
        };
      } else if (action.payload === "Trap") {
        return {
          ...state,
          url:
            "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=Trap Card&" +
            state.searchSpellType,
        };
      } else {
        return {
          ...state,
          url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
        };
      }
    } else if (action.type === "SearchBarType") {
      if (action.payload === "Monster") {
        return {
          ...state,
          searchType: action.payload,
        };
      } else {
        return {
          ...state,
          searchType: action.payload,
          url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=&",
        };
      }
    } else if (action.type === "SearchBarMonsterType") {
      return {
        ...state,
        searchMonsterType: action.payload,
        monsterscale: "",
        monsterlink: "",
      };
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
    } else if (action.type === "SetMonsterAtk") {
      return { ...state, monsteratk: action.payload };
    } else if (action.type === "SetMonsterAtkreq") {
      return { ...state, monsteratkreq: action.payload };
    } else if (action.type === "SetMonsterDef") {
      return { ...state, monsterdef: action.payload };
    } else if (action.type === "SetMonsterDefreq") {
      return { ...state, monsterdefreq: action.payload };
    } else if (action.type === "SetMonsterAttribute") {
      return { ...state, monsterattribute: action.payload };
    } else if (action.type === "SetMonsterType") {
      return { ...state, monstertype: action.payload };
    } else if (action.type === "SetMonsterScale") {
      return { ...state, monsterscale: action.payload };
    } else if (action.type === "SetMonsterLink") {
      return { ...state, monsterlink: action.payload };
    } else if (action.type === "SetMonsterLevel") {
      return { ...state, monsterlevel: action.payload };
    } else if (action.type === "SetMonsterSort") {
      return { ...state, monstersort: action.payload };
    } else if (action.type === "HardReset") {
      return state;
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
    searchType: "",
    searchMonsterType: "",
    searchSpellType: "",
    searchTrapType: "",
    type: "",
    url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=&",
    ///////////////////////////////////////////////////////////
    error: null,
    monsteratk: "",
    monsteratkreq: "",
    monsterdef: "",
    monsterdefreq: "",
    monsterattribute: "",
    monstertype: "",
    monsterscale: "",
    monsterlink: "",
    monsterlevel: "",
    monstersort: "",
  };

  const searchAPI = async () => {
    console.log(state.url);
    try {
      let { data } = await axios.get(state.url);

      dispatch({ type: "getinitialData", payload: data });
      dispatch({ type: "CatchError", payload: null });
    } catch (err) {
      dispatch({ type: "CatchError", payload: "error" });
      dispatch({ type: "getinitialData", payload: { data: [] } });
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
                const target = element.target.value;
                //Call API with the latest URL then filtered the data and create a state call filterdata
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
          <button
            onClick={() => {
              const searchbarinput = document.getElementsByClassName(
                "SearchInput"
              )[0].value;

              searchAPI().then(() => {
                dispatch({
                  type: "SearchBarChanges",
                  payload: searchbarinput,
                });

                dispatch({ type: "changeSearchState", payload: true });
              });
            }}
          >
            Submit
          </button>
          <select
            className="search-component"
            id="searchbar-type"
            onChange={(element) => {
              dispatch({
                type: "SearchBarType",
                payload: element.target.value,
              });
              dispatch({
                type: "ChangeUrl",
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
            <div>
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
                  Pendulum Effect Monster
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
              <div class="monsterLevel">
                <input
                  placeholder="Level/Rank"
                  onChange={(element) => {
                    dispatch({
                      type: "SetMonsterLevel",
                      payload: "&level=" + element.target.value,
                    });
                    dispatch({
                      type: "ChangeUrl",
                      payload: "Monster",
                    });
                  }}
                ></input>
              </div>
              <div class="monsterAtkDiv">
                <select
                  placeholder="Atk Value"
                  id="searchbar-spell-type"
                  onChange={(element) => {
                    console.log(element.target.value);
                    dispatch({
                      type: "SetMonsterAtkreq",
                      payload: element.target.value,
                    });
                    dispatch({
                      type: "ChangeUrl",
                      payload: "Monster",
                    });
                  }}
                >
                  <option value=""></option>
                  <option value="atk=gt">Greater</option>
                  <option value="atk=lt">Less than</option>
                  <option value="atk=gte">Greater or equal</option>
                  <option value="atk=lte">Less than or equal</option>
                </select>
                <input
                  placeholder="Atk Value"
                  onChange={(element) => {
                    dispatch({
                      type: "SetMonsterAtk",
                      payload: element.target.value,
                    });
                    dispatch({
                      type: "ChangeUrl",
                      payload: "Monster",
                    });
                  }}
                ></input>
              </div>
              <div class="monsterDefDiv">
                <select
                  placeholder="Atk Value"
                  id="searchbar-spell-type"
                  onChange={(element) => {
                    console.log(element.target.value);
                    dispatch({
                      type: "SetMonsterDefreq",
                      payload: element.target.value,
                    });
                    dispatch({
                      type: "ChangeUrl",
                      payload: "Monster",
                    });
                  }}
                >
                  <option value=""></option>
                  <option value="&def=gt">Greater</option>
                  <option value="&def=lt">Less than</option>
                  <option value="&def=gte">Greater or equal</option>
                  <option value="&def=lte">Less than or equal</option>
                </select>
                <input
                  placeholder="Def Value"
                  onChange={(element) => {
                    dispatch({
                      type: "SetMonsterDef",
                      payload: element.target.value,
                    });
                    dispatch({
                      type: "ChangeUrl",
                      payload: "Monster",
                    });
                  }}
                ></input>
              </div>

              <div class="attributeDiv">
                <label>Attribute</label>
                <select
                  placeholder="Attribute"
                  onChange={(element) => {
                    console.log(element.target.value);
                    dispatch({
                      type: "SetMonsterAttribute",
                      payload: element.target.value,
                    });
                    dispatch({
                      type: "ChangeUrl",
                      payload: "Monster",
                    });
                  }}
                >
                  <option value=""></option>
                  <option value="&attribute=light">light</option>
                  <option value="&attribute=dark">dark</option>
                  <option value="&attribute=earth">earth</option>
                  <option value="&attribute=fire">fire</option>
                  <option value="&attribute=water">water</option>
                  <option value="&attribute=wind">wind</option>
                  <option value="&attribute=divine">divine</option>
                </select>
              </div>

              <div class="TypeDiv">
                <label>Type</label>
                <select
                  placeholder="Type"
                  onChange={(element) => {
                    console.log(element.target.value);
                    dispatch({
                      type: "SetMonsterType",
                      payload: element.target.value,
                    });
                    dispatch({
                      type: "ChangeUrl",
                      payload: "Monster",
                    });
                  }}
                >
                  <option value=""></option>
                  <option value="&race=zombie">zombie</option>
                  <option value="&race=fiend">fiend</option>
                  <option value="&race=cyverse">cyverse</option>
                  <option value="&race=rock">rock</option>
                  <option value="&race=warrior">warrior</option>
                  <option value="&race=winged beast">winged beast</option>
                  <option value="&race=spellcaster">spellcaster</option>
                  <option value="&race=beast">beast</option>
                  <option value="&race=fairy">fairy</option>
                  <option value="&race=fish">fish</option>
                  <option value="&race=beast-warrior">beast-warrior</option>
                  <option value="&race=thunder">thunder</option>
                  <option value="&race=machine">machine</option>
                  <option value="&race=sea serpent">sea serpent</option>
                  <option value="&race=aqua">aqua</option>
                  <option value="&race=plant">plant</option>
                  <option value="&race=dragon">dragon</option>
                  <option value="&race=reptile">reptile</option>
                  <option value="&race=psychic">psychic</option>
                  <option value="&race=insect">insect</option>
                  <option value="&race=pyro">pyro</option>
                  <option value="&race=dinosaur">dinosaur</option>
                  <option value="&race=wyrm">wyrm</option>
                  <option value="&race=cyberse">cyberse</option>
                  <option value="&race=divine-beast">divine-beast</option>
                  <option value="&race=creator-god">creator-god</option>
                </select>

                <div class="monsterscale">
                  {state.searchMonsterType.indexOf("Pendulum") !== -1 ? (
                    <div>
                      <lable>Pendulum Scale:</lable>
                      <input
                        placeholder="Scale"
                        onChange={(element) => {
                          dispatch({
                            type: "SetMonsterScale",
                            payload: "&scale=" + element.target.value,
                          });
                          dispatch({
                            type: "ChangeUrl",
                            payload: "Monster",
                          });
                        }}
                      ></input>
                    </div>
                  ) : null}

                  {state.searchMonsterType.indexOf("Link") !== -1 ? (
                    <div>
                      <lable>Link:</lable>
                      <input
                        placeholder="Link Arrow"
                        onChange={(element) => {
                          dispatch({
                            type: "SetMonsterLink",
                            payload: "&link=" + element.target.value,
                          });
                          dispatch({
                            type: "ChangeUrl",
                            payload: "Monster",
                          });
                        }}
                      ></input>
                    </div>
                  ) : null}
                </div>

                <div class="sorting">
                  <lable>Sorted By:</lable>
                  <select
                    className="search-component"
                    id="searchbar-type"
                    onChange={(element) => {
                      dispatch({
                        type: "SetMonsterSort",
                        payload: "&sort=" + element.target.value,
                      });
                      dispatch({
                        type: "ChangeUrl",
                        payload: "Monster",
                      });
                    }}
                  >
                    <option value=""></option>
                    <option value="atk">Attack</option>
                    <option value="def">Defend</option>
                    <option value="name">Name</option>
                    <option value="level">Level</option>
                    <option value="new">Released date</option>
                  </select>
                </div>
              </div>
            </div>
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
              <option value="race=field">Field</option>
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
                  payload: "Trap",
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
