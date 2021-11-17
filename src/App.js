import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/VavBar/NavBar";
import Slideshow from "./component/Slideshow/Slideshow";
import Content from "./component/content/content";
import Profile from "./component/profile/profile";
import Card from "./component/card/card";
import Details from "./component/details/details";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import SignUp from "./component/signe up/signe up";
import LogIn from "./component/login/login";
import NewHotels from "./component/newHotels/newhotels";
import Creat_new_post from "./component/new/new";
import AppartementForRent_M from "./component/Appartement for rent M/appartement for rent m";
import AppartementForRent_D from "./component/Appartement for rent D/appartement for rent d";
import Appartement_for_sale from "./component/Appartement for sale/appartement for sale";
import Image from "./component/image/image";

function App() {
  const [Hotel, setHotel] = useState();
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(null);
  const [Hotels, setHotels] = useState();
  const [Laoding, setLoiding] = useState(true);
  const [Laoding2, setLaoding2] = useState(false);
  const [ERROR, setERROR] = useState(false);
  const [search, setSearch] = useState(false);
  console.log("Hotels", Hotels);
  console.log("date", date);
  console.log("day", day);

  console.log("Hotel", Hotel);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Slideshow className="slideshow" />
            <Content
              setHotel={setHotel}
              setDate={setDate}
              date={date}
              setDay={setDay}
              setHotels={setHotels}
              setSearch={setSearch}
            />
            <Image />
            {search ? <Card hotel={Hotel} /> : false}
          </Route>
          <Route exact path="/SignUp">
            <SignUp />
          </Route>
          <Route exact path="/Details/:id">
            <Details />
          </Route>

          <Route exact path="/LogIn">
            <LogIn />
          </Route>
          <Route exact path="/Profile">
            <Profile />
          </Route>

          <Route exact path="/Creat_new_post">
            <Creat_new_post />
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
