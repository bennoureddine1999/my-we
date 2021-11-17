import React from "react";
import card from "./card.css";
import placelogo from "../../image/placeholder.png";
import { useHistory, useRouteMatch } from "react-router-dom";

function Card(props) {
  const history = useHistory();

  return (
    <div
      className="card"
      onClick={() => {
        history.push(`/Details/${props.hotel[2]._id}`);
      }}
    >
      <div style={{ width: "20%" }}>name </div>
      <div className="contentdiv">
        <h1 style={{ fontSize: "1.9rem" }}>{props.hotel[2].title}</h1>
        <div className="place">
          <img
            src={placelogo}
            className="placelogo"
            style={{ marginLeft: "0.5rem" }}
          />
          <p className="placecontent">Province: {props.hotel[2].province}</p>
          <p className="placecontent">,</p>
          <p className="placecontent">City: {props.hotel[2].city}</p>
        </div>
        <div>
          <p className="tagediv">{props.hotel[2].liste}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "1.7rem",
          }}
        >
          <p style={{ color: "black" }}>Price :</p>
          <p
            style={{
              color: "red",
              marginLeft: "0.8rem",
              fontWeight: "700",
              fontSize: "1.8rem",
            }}
          >
            {" "}
            {props.hotel[2].prix}{" "}
          </p>
          <p style={{ marginLeft: "0.8rem", color: "gray" }}>DZ</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
