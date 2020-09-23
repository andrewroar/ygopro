/*
const AppContext = createContext()



App.js
<Appcontext.Provider value={appReducer} >

</AppContext.Provider>

const initialState = { bla, b;ah, modalVisible: false}

const appReducer = (state, action) {
    switch (action) {
        case SET_MODAL_VISIBLE:
            return { ...state, modalVisible: true }
        case SET_MODAL_NOT_VISIBLE:
            return { ....state, modalVisible: false}
    }
}
const appReducer = useReducer(initialState, appReducer)


Inside of the CardList Screen

const appContext = useContext(AppContext)

const { modalVisible } = appContext


<Modal 
  visible={modalVisible}
/>
 */
import React, { useReducer, useEffect } from "react";
//import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AppModal(props) {
  let history = useHistory();
  const initialState = { visible: false, password: "", id: "" };

  const reducer = (state, action) => {
    if (action.type === "modalVisible") {
      return { ...state, visible: true };
    } else if (action.type === "modalInvisible") {
      return { ...state, visible: false };
    } else if (action.type === "dispatchid") {
      return { ...state, id: action.payload };
    } else if (action.type === "dispatchpassword") {
      return { ...state, password: action.payload };
    } else {
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const showModal = () => {
    dispatch({ type: "modalVisible" });
  };

  const handleOk = (event) => {
    event.preventDefault();
    DeleteCard();

    dispatch({ type: "modalInvisible" });
  };

  const handleCancel = (e) => {
    console.log(e);
    console.log(e.currentTarget.id);

    dispatch({ type: "modalInvisible" });
  };

  const handleInput = (event) => {
    const password = event.target.value;
    const id = event.target.id;

    dispatch({ type: "dispatchid", payload: id });
    dispatch({ type: "dispatchpassword", payload: password });
  };

  ////////////////////////////////////

  const DeleteCard = () => {
    var Promptedpassword = state.password;

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
      `https://mighty-everglades-65889.herokuapp.com/api/customcards/${state.id}`,
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

  return (
    <>
      <button onClick={showModal}>Delete</button>

      {/* <Button onClick={showModal}>Open Modal</Button> */}
      <Modal
        visible={state.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        id={props.id}
      >
        <label>Enter the password</label>
        <input id={props.id} type="password" onChange={handleInput}></input>
      </Modal>
    </>
  );
}

export default AppModal;
