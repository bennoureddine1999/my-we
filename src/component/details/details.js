import React from "react";
import detail from "./details.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../VavBar/NavBar";
import placelogo from "../../image/placeholder.png";

function Details() {
  const { id } = useParams();
  // console.log(id);
  const [hotel, setHotel] = useState("");
  const [ERROR, setERROR] = useState(false);
  const [Laoding, setLaoding] = useState(true);
  // console.log("hotel", hotel);
  useEffect(() => {
    const getdata = async () => {
      try {
        const hotels = await axios.get("http://localhost:7000/hotels/" + id);
        const hotelsJS = hotels.data;
        const hoteldata = hotelsJS.data;
        // console.log("hotels", hotels);
        // console.log("hotelsJS", hotelsJS);
        // console.log(hotelsJS.data);
        setHotel(hoteldata);
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
      <div>
        <div>images</div> <h1 style={{ fontSize: "1.9rem" }}>{hotel.title}</h1>
      </div>

      <p style={{ color: "black" }}>Price :</p>
      <p
        style={{
          color: "red",
          marginLeft: "0.8rem",
          fontWeight: "700",
          fontSize: "1.8rem",
        }}
      ></p>
      <p style={{ marginLeft: "0.8rem", color: "gray" }}>DZ</p>
    </div>
  );
}

export default Details;
