import React, { useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AppModal from "./appmodal";

function Customcards() {
  const initialState = {
    loading: true,
    customCardData: [],
    url: "https://mighty-everglades-65889.herokuapp.com/api/customcards/",
    error: null,
  };

  const reducer = (state, action) => {
    if (action.type === "getinitialData") {
      console.log(action.payload.results);
      return {
        ...state,
        customCardData: action.payload.results,
        loading: false,
      };
    } else if (action.type === "setcustomCardType") {
      return { ...state, customCardType: action.payload };
    } else {
      return state;
    }
  };
  const searchAPI = async () => {
    try {
      let { data } = await axios.get(state.url);

      dispatch({ type: "getinitialData", payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "CatchError", payload: "error" });
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  ///////////Add Card to data base////////////
  let history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      type: event.target.type.value,
      race: event.target.race.value,
      vote: 0,
      password: event.target.password.value,

      description: event.target.description.value.replace(/\r?\n/g, "<br />"),
    };

    console.log(data);

    fetch("https://mighty-everglades-65889.herokuapp.com/api/customcards/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        alert("Submitted!");
        history.replace("/ygopro");
      })
      .catch((err) => {
        alert(err);
      });
  };

  //////Voting and Delete//////
  const voteCard = (event) => {
    event.preventDefault();

    const data = {
      vote: parseInt(event.currentTarget.getAttribute("data-vote")),
    };

    fetch(
      `https://mighty-everglades-65889.herokuapp.com/api/customcards/vote/${event.currentTarget.id}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data),
      }
    )
      .then(() => {
        alert("Your vote has been registered");

        history.replace("/ygopro");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const DeleteCard = (event) => {
    event.preventDefault();
    var Promptedpassword = prompt("Enter in the password");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ password: Promptedpassword });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://mighty-everglades-65889.herokuapp.com/api/customcards/${event.currentTarget.id}`,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          alert("You custom card has been deleted");
          history.replace("/ygopro");
        } else {
          alert("Incorrect Password");
        }
      })
      .catch((err) => {
        alert("There is an error");
      });
  };

  //////////////////////

  useEffect(() => {
    searchAPI();
  }, []);

  return (
    <div class="flex">
      <div className="form-div">
        <form onSubmit={handleSubmit} className="form box-shadow">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your card name"
          />
          <select
            id="type"
            name="type"
            onChange={(element) => {
              console.log(element.target.value);
            }}
            className="form-component"
          >
            <option value="Monster">Monster</option>
            <option value="Spell">Spell</option>
            <option value="Trap">Trap</option>
          </select>
          <select id="race" name="race">
            <option value="" selected disabled>
              Select Type
            </option>
            <option value="Normal Monster">Normal Monster</option>
            <option value="Normal Tuner Monster">Normal Tuner Monster</option>
            <option value="Effect Monster">Effect Monster</option>
            <option value="Tuner Monster">Tuner</option>

            <option value="Flip Effect Monster">Flip Effect Monster</option>

            <option value="Spirit Monster">Spirit Monster</option>
            <option value="Union Effect Monster">Union Effect Monster</option>
            <option value="Gemini Monster">Gemini Monster</option>
            <option value="Pendulum Effect Monster">
              Pendulum Effect Monste
            </option>
            <option value="Pendulum Normal Monster">
              Pendulum Normal Monster
            </option>
            <option value="Pendulum Tuner Effect Monster">
              Pendulum Tuner Effect Monster
            </option>
            <option value="Pendulum Flip Effect Monster">
              Pendulum Flip Effect Monster
            </option>

            <option value="XYZ Monster">XYZ Monster</option>
            <option value="XYZ Pendulum Effect Monster">
              XYZ Pendulum Effect Monster
            </option>

            <option value="Fusion Monster">Fusion Monster</option>
            <option value="Pendulum Effect Fusion Monster">
              Pendulum Effect Fusion Monster
            </option>
            <option value="Synchro Monster">Synchro Monster</option>
            <option value="Synchro Tuner Monster">Synchro Tuner Monster</option>
            <option value="Synchro Pendulum Effect Monster">
              Synchro Pendulum Effect Monster
            </option>
            <option value="Ritual Monster">Ritual Monster</option>
            <option value="Ritual Effect Monster">Ritual Effect Monster</option>
            <option value="Link Monster">Link Monster</option>
            <option value="Equip Spell">Equip Spell</option>
            <option value="Continuous Spell">Continuous Spell</option>
            <option value="Quick-Play Spell">Quick-Play Spell</option>
            <option value="Ritual Spell">Ritual Spell</option>
            <option value="Field Spell">Field Spell</option>
            <option value="Continuous Trap">Continuous Trap</option>
            <option value="Counter Trap">Counter Trap</option>
          </select>

          <textarea
            id="description"
            name="description"
            className="form-description"
            placeholder="Please enter a description of your card"
          ></textarea>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="The password will be used to delete your card"
          />
          <button>Add Custom Card</button>
        </form>
        {state.loading ? (
          <h2 style={{ "text-align": "center" }}>Loading...</h2>
        ) : null}
      </div>

      <div className="main-list">
        {state.customCardData
          .sort((a, b) => {
            return b.vote - a.vote;
          })
          .map((item) => {
            return (
              <div className="custom-card-box box-shadow">
                <h2>{item.name}</h2>

                <p>{item.type}</p>
                <p>{item.race}</p>
                <span dangerouslySetInnerHTML={{ __html: item.description }} />

                <p>Vote: {item.vote}</p>
                <button
                  id={item._id}
                  data-vote={item.vote + 1}
                  onClick={voteCard}
                >
                  Vote
                </button>

                <AppModal id={item._id} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Customcards;
