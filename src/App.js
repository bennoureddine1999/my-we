import logo from "./logo.svg";
import "./App.css";
import Navbar from "./component/VavBar/NavBar";
import Slideshow from "./component/Slideshow/Slideshow";
import Content from "./component/content/content";
import EditProfile from "./component/Editprofile/Editprofile";
import Card from "./component/card/card";
import Profile from "./component/profile/profile";
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
  const [a_f_r_d, set_A_f_r_d] = useState();
  const [a_f_r_m, set_A_f_r_m] = useState();
  const [a_f_s, set_A_f_s] = useState();

  const [Laoding, setLoiding] = useState(true);
  const [Laoding2, setLaoding2] = useState(false);
  const [ERROR, setERROR] = useState(false);
  const [search, setSearch] = useState();
  console.log("Hotels", Hotels);
  console.log("date", date);
  console.log("day", day);
  console.log("a_f_r_d", a_f_r_d);
  console.log("a_f_r_m", a_f_r_m);
  console.log("a_f_s", a_f_s);

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
              set_A_f_r_d={set_A_f_r_d}
              set_A_f_r_m={set_A_f_r_m}
              set_A_f_s={set_A_f_s}
              setDate={setDate}
              date={date}
              setDay={setDay}
              // setHotels={setHotels}
              setSearch={setSearch}
            />
            {/* <Image /> */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {/* {Hotel ? Hotel.map((hotel1) => <Card hotel={hotel1} />) : false} */}
              {search ? search.map((item) => <Card hotel={item} />) : false}
            </div>
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
          <Route exact path="/Editprofile">
            <EditProfile />
          </Route>
          <Route exact path="/profile">
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
