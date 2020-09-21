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

function AppModal() {
  const initialState = { visible: false };
  const reducer = (state, action) => {
    if (action.type === "modalVisible") {
      return { ...state, visible: true };
    } else if (action.type === "modalInvisible") {
      return { ...state, visible: false };
    } else {
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const showModal = () => {
    dispatch({ type: "modalVisible" });
  };

  const handleOk = (e) => {
    console.log(e);

    dispatch({ type: "modalInvisible" });
  };

  const handleCancel = (e) => {
    console.log(e);

    dispatch({ type: "modalInvisible" });
  };

  ////////////////////////////////////

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
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={state.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default AppModal;
