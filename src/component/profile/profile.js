import React from "react";
import profile from "./profile.css";
import { useHistory } from "react-router-dom";
import Navbar from "../VavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Card from "../card/card";

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userlogin = useSelector((state) => state.userlogin);
  const email = userlogin.email;
  console.log(email);

  const [Laoding, setLaoding] = useState(true);
  const [USERS, setUSERS] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const [hotelcard, setHotelcard] = useState();
  const [AFScard, setAFScard] = useState();
  const [AFRMcard, setAFRMcard] = useState();
  const [AFRDcard, setAFRDcard] = useState();
  const [userloginID, setuserloginID] = useState();
  const [clickbutton, setClickbutton] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      try {
        setLaoding(true);
        const users = await axios.post("http://localhost:7000/users/email", {
          email,
        });
        const usersJS = users.data;
        console.log(usersJS);
        setuserloginID(users.data.data._id);
        setUSERS(usersJS.data);
        setUserPhoto(usersJS.data.photo);
        setLaoding(false);

        console.log("users:", usersJS);
      } catch (error) {
        setLaoding(false);

        console.log("error", error);
      }
    };
    getdata();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="profilecard">
        <div className="firstDiv"></div>
        <Avatar
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "-6rem",
            border: "solid 1px gray",
          }}
          alt="Remy Sharp"
          src={userPhoto}
          // src={selectedImage == [] ? USERS.photo : selectedImage}
          sx={{ width: 190, height: 190 }}
        />
        <div style={{ border: "solid 2px black" }}>
          <div className="secondDiv">
            <div className="informationDiv">
              <p>Username:</p>
              <p>{USERS.username}</p>
            </div>
            <div className="informationDiv">
              <p>Name:</p>
              <p>{USERS.name}</p>
            </div>

            <div className="informationDiv">
              <p>Age:</p>
              <p>{USERS.age} years</p>
            </div>
            <div className="informationDiv">
              <p>date of birth:</p>
              <p>{USERS.dateofbirth}</p>
            </div>
            <div className="informationDiv">
              <p>Email:</p>
              <p>{USERS.email}</p>
            </div>
            <div className="informationDiv">
              <p>Phone number:</p>
              <p>{USERS.phone}</p>
            </div>
          </div>
          <button
            onClick={() => {
              history.push("/Editprofile");
            }}
          >
            Edit profile
          </button>
        </div>
        <div>
          <button
            style={{ width: "5rem" }}
            onClick={async (e) => {
              e.preventDefault();
              try {
                const gethotelcard = await axios.post(
                  "http://localhost:7000/hotels/findcard",
                  {
                    userloginID,
                  }
                );
                console.log("gethotelcard", gethotelcard.data.data);
                setHotelcard(gethotelcard.data.data);
                const getAFScard = await axios.post(
                  "http://localhost:7000/AppartementForSale/findcard",
                  {
                    userloginID,
                  }
                );
                console.log("getAFScard", getAFScard.data.data);
                setAFScard(getAFScard.data.data);
                const getAFRMcard = await axios.post(
                  "http://localhost:7000/AppartementForRent_M/findcard",
                  {
                    userloginID,
                  }
                );
                console.log("getAFRMcard", getAFRMcard.data.data);
                setAFRMcard(getAFRMcard.data.data);

                const getAFRDcard = await axios.post(
                  "http://localhost:7000/AppartementForRent_D/findcard",
                  {
                    userloginID,
                  }
                );
                console.log("getAFRDcard", getAFRDcard.data.data);
                setAFRDcard(getAFRDcard.data.data);
              } catch (error) {
                console.log("error", error);
              }
              setClickbutton(!clickbutton);
            }}
          >
            See your card
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {clickbutton ? hotelcard.map((item) => <Card hotel={item} />) : false}
          {clickbutton ? AFScard.map((item) => <Card hotel={item} />) : false}
          {clickbutton ? AFRMcard.map((item) => <Card hotel={item} />) : false}
          {clickbutton ? AFRDcard.map((item) => <Card hotel={item} />) : false}
        </div>
      </div>
    </div>
  );
}

export default Profile;
