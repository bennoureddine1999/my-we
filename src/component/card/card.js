import React, { useState } from "react";
import card from "./card.css";
import placelogo from "../../image/placeholder.png";
import { useHistory, useRouteMatch } from "react-router-dom";
import adresslogo from "../../image/placeholder.png";
import pricelogo from "../../image/dollar.png";
import { ellipsis } from "polished";
import { TextField, Button } from "@material-ui/core";

function Card(props) {
  const history = useHistory();
  // console.log("images", props.hotel.photo);

  return (
    <div
      className="card"
      onClick={() => {
        history.push(`/Details/${props.hotel._id}`);
      }}
    >
      <div className="firstimgdiv">
        <img
          src={props.hotel.photo[0]}
          style={{ width: "100%", maxHeight: "14rem" }}
        />
      </div>
      <div className="contentdiv">
        <h1 className="titleh1">{props.hotel.title}</h1>
        <div className="positiondiv">
          <div className="positiondiv">
            <img
              src={adresslogo}
              className="adressLogo"
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
              {props.hotel.province} ,
            </p>
            <p>{props.hotel.city}</p>
          </div>
        </div>
        <div className="positiondiv" style={{ right: "0" }}>
          <img
            src={pricelogo}
            className="adressLogo"
            style={{
              // marginLeft: "7rem",
              filter:
                " invert(46%) sepia(27%) saturate(2633%) hue-rotate(195deg) brightness(98%) contrast(96%)",
            }}
          />
          <p style={{ marginLeft: "0.6rem" }}>{props.hotel.prix} DA/day</p>
        </div>
        <div>
          <p className="text">{props.hotel.content}</p>
          <p
            style={{
              color: "blue",
              textDecoration: "underline ",
              marginTop: "0rem",
              marginBottom: "4rem",
              // border: "solid 2px black",
            }}
            onClick={() => {
              history.push(`/Details/${props.hotel._id}`);
            }}
          >
            see more
          </p>
        </div>
      </div>
      <Button
        variant="contained"
        style={{
          height: "3rem",
          letterSpacing: "0.4rem",
          alignContent: "center",
          width: "100%",
          position: "absolute",
          bottom: "0",
          borderTopLeftRadius: "20px",
        }}
      >
        BooK Now{" "}
      </Button>{" "}
    </div>
  );
}

export default Card;
