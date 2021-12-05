import React from "react";
import detail from "./details.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../VavBar/NavBar";
import placelogo from "../../image/placeholder.png";
import adresslogo from "../../image/placeholder.png";
import pricelogo from "../../image/dollar.png";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import EmailLogo from "../../image/email.png";
import PhoneLogo from "../../image/phone-call.png";
import { Button } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import { ThemeConsumer } from "styled-components";
import { Hotel } from "@material-ui/icons";

function Details() {
  const { id } = useParams();
  // console.log(id);
  const [hotel, setHotel] = useState("");
  const [ERROR, setERROR] = useState(false);
  const [Laoding, setLaoding] = useState(true);
  const [imagelist, setImagelist] = useState([]);
  const [Id, setUserId] = useState("");
  const [useravatar, setUseAvatar] = useState("");
  const [userName, setUserName] = useState("");
  // console.log("hotel", hotel);
  useEffect(() => {
    const getdata = async () => {
      try {
        const hotels = await axios.get("http://localhost:7000/hotels/" + id);
        const hotelsJS = hotels.data;
        const hoteldata = hotelsJS.data;
        setHotel(hoteldata);
        setImagelist(hoteldata.photo);

        // setUserId(hotelsJS.data.userloginID);
        // const id = hoteldata.userloginID;
        // const users = await axios.get("http://localhost:7000/users/" + id);

        // const usersJS = users.data;
        // const userdata = usersJS.data;
        // console.log("userdata", userdata);
        // setUserName(userdata.username);
        // setUseAvatar(userdata.photo);
        // console.log("hotels", hotels);
        // console.log("hotelsJS", hotelsJS);
        // console.log(hotelsJS.data);
        // setHotel(hoteldata);
        setLaoding(false);
      } catch (error) {
        setERROR(true);
        setLaoding(false);

        console.log("error", error);
      }
    };
    getdata();
  }, []);

  useEffect(() => {
    const getdata = async () => {
      try {
        const users = await axios.get("http://localhost:7000/users/" + Id);

        const usersJS = users.data;
        const userdata = usersJS.data;
        console.log("userdata", userdata);
        setUserName(userdata[0].username);
        setUseAvatar(userdata[0].photo);

        setLaoding(false);
      } catch (error) {
        setERROR(true);
        setLaoding(false);

        console.log("error", error);
      }
    };
    getdata();
  }, []);
  return (
    <div>
      <Navbar />
      {Laoding ? (
        <div>laoding</div>
      ) : (
        <div className="detailsCard">
          <ImageList
            className="imagesDiv"
            // style={{
            //   width: "40%",
            //   height: 550,
            //   flexWrap: "wrap",
            //   border: "solid 1px gray",
            //   backgroundColor: "white",
            // }}
            // variant="quilted"
          >
            {imagelist.map((item) => (
              <img
                src={item}
                alt={item.title}
                style={{ width: "15rem" }}
                key={item.id}
              />
            ))}
          </ImageList>
          <div className="contentDiv">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar alt="Remy Sharp" src={useravatar} />
              <p style={{ marginLeft: "0.8rem", fontSize: "1.5rem" }}>
                {userName}
              </p>
            </div>
            <h1>{hotel.title}</h1>
            <div className="positiondiv1">
              <div className="positiondiv1">
                <img
                  src={adresslogo}
                  className="adressLogo1"
                  style={{
                    filter:
                      " invert(46%) sepia(27%) saturate(2633%) hue-rotate(195deg) brightness(98%) contrast(96%)",
                  }}
                />
                <p
                  style={{
                    marginLeft: "0.6rem",
                  }}
                >
                  {hotel.province} ,
                </p>
                <p>{hotel.city}</p>
              </div>
            </div>
            <div className="positiondiv1" style={{ right: "0" }}>
              <img
                src={pricelogo}
                className="adressLogo1"
                style={{
                  // marginLeft: "7rem",
                  filter:
                    " invert(46%) sepia(27%) saturate(2633%) hue-rotate(195deg) brightness(98%) contrast(96%)",
                }}
              />
              <p style={{ marginLeft: "0.6rem" }}>{hotel.prix} DA/day</p>
            </div>
            <p className="discription_p">Description:</p>
            <p
              style={{
                width: "39rem",
                // border: "solid 2px black",
              }}
            >
              {hotel.content}
            </p>
            <p className="discription_p">Contacts:</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                // border: "solid 2px black",
              }}
            >
              <div className="contactDiv">
                <img
                  className="contactDivContent"
                  style={{
                    width: "1.4rem",
                    height: "1.4rem",
                    filter:
                      " invert(46%) sepia(27%) saturate(2633%) hue-rotate(195deg) brightness(98%) contrast(96%)",
                  }}
                  src={EmailLogo}
                />
                <p className="contactDivContent">{hotel.email}</p>
              </div>
              <div className="contactDiv">
                <img
                  className="contactDivContent"
                  style={{
                    width: "1.4rem",
                    height: "1.4rem",
                    filter:
                      " invert(46%) sepia(27%) saturate(2633%) hue-rotate(195deg) brightness(98%) contrast(96%)",
                  }}
                  src={PhoneLogo}
                />
                <p className="contactDivContent">{hotel.phone}</p>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "20%",
                marginRight: "1rem",
                // marginLeft: "auto",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Button
                variant="contained"
                style={{
                  height: "3rem",
                  letterSpacing: "0.4rem",
                  alignContent: "center",
                  width: "100%",
                  // marginRight: "0rem",
                  // marginLeft: "auto",

                  borderBottomRightRadius: "30px",
                }}
              >
                BooK Now{" "}
              </Button>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
