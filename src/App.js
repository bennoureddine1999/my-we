import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/VavBar/NavBar";
import Slideshow from "./component/Slideshow/Slideshow";
import Content from "./component/content/content";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import SignUp from "./component/signe up/signe up";
import LogIn from "./component/login/login";
import NewHotels from "./component/newHotels/newhotels";
import New from "./component/new/new";
import AppartementForRent_M from "./component/Appartement for rent M/appartement for rent m";
import AppartementForRent_D from "./component/Appartement for rent D/appartement for rent d";
import Appartement_for_sale from "./component/Appartement for sale/appartement for sale";

function App() {
  const [Login, setLogin] = useState(null);
  console.log(Login);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar Login={Login} />
            <Slideshow className="slideshow" />
            <Content />
          </Route>
          <Route exact path="/SignUp">
            <SignUp />
          </Route>
          <Route exact path="/LogIn">
            <LogIn setLogin={setLogin} />
          </Route>

          <Route exact path="/New">
            <New />
          </Route>

          <Route exact path="/Newhotel">
            <NewHotels />
          </Route>
          <Route exact path="/AppartementForRent_D">
            <AppartementForRent_D />
          </Route>
          <Route exact path="/AppartementForRent_M">
            <AppartementForRent_M />
          </Route>
          <Route exact path="/Appartement_for_sale">
            <Appartement_for_sale />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
