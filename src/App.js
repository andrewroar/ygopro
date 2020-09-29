import React, { useReducer } from "react";
import ReactLoading from "react-loading";

import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import CardContainer from "./components/cardcontainer";
import Searchbar from "./components/searchbar";

import Customcards from "./components/customcards";
import BanlistTCG from "./components/banlist_tcg";
import BanlistOCG from "./components/banlist_ocg";

function App() {
  return (
    <div>
      <header>
        <h1 class="title">YGOPRO Database</h1>
      </header>

      <Router>
        <nav className="navbar box-shadow">
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="navbar-component"
          >
            <p>Main Page</p>
          </Link>

          <Link
            to="/customercard"
            style={{ textDecoration: "none" }}
            className="navbar-component"
          >
            <p>Custom Card</p>
          </Link>

          <Link
            to="/banlisttcg"
            style={{ textDecoration: "none" }}
            className="navbar-component"
          >
            <p>Banlist (TCG)</p>
          </Link>

          <Link
            to="/banlistocg"
            style={{ textDecoration: "none" }}
            className="navbar-component"
          >
            <p>Banlist (OCG)</p>
          </Link>
        </nav>

        <div>
          <Switch>
            <Route exact path="/">
              <Searchbar />
            </Route>

            <Route exact path="/customercard">
              <Customcards />
            </Route>
            <Route exact path="/banlisttcg">
              <BanlistTCG />
            </Route>
            <Route exact path="/banlistocg">
              <BanlistOCG />
            </Route>

            <Route exact path="/card/:id">
              <CardContainer />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

//<input
//placeholder="Enter card's name, then enter"
//className="SearchInput"
//onKeyDown={(element) => {
//  if (element.keyCode == 13) {
//    dispatch({
//      type: "SearchBarChanges",
//      payload: element.target.value,
//    });
//  }
//}}
///>

//{state.filteredData.map((item) => {
//  return <Home name={item.name} id={item.id} />;
//})}
