import React from "react";
import content from "./content.css";
import { useState } from "react";
import imgRent from "../../image/rent.png";
import imgSale from "../../image/sale.png";
import imghotel from "../../image/hotel.png";
import { color, style } from "@mui/system";

function Content() {
  const [active, setActive] = useState("Hotels");
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);

  const btn_class1 = color1 ? "bluebutton" : "withbutton";
  const btn_class2 = color2 ? "bluebutton" : "withbutton";
  const btn_class3 = color3 ? "bluebutton" : "withbutton";

  return (
    <div className="content">
      <div className="fistpart">
        <div
          className={btn_class1}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "33%",
            marginTop: "0rem",
          }}
          onClick={() => {
            setActive("Hotels");
            setColor1(true);
            setColor2(false);
            setColor3(false);
          }}
        >
          <img className="imghotel" src={imghotel} />

          <p className="paragraph1">Hotels</p>
        </div>

        <div
          className={btn_class2}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "33%",
            marginTop: "0rem",
          }}
          onClick={() => {
            setActive("Appartement for rent");
            setColor2(true);
            setColor1(false);
            setColor3(false);
          }}
        >
          <img className="imgRent" src={imgRent} />

          <p className="paragraph2">
            Appartement <br />
            for rent
          </p>
        </div>
        <div
          className={btn_class3}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "33%",
            marginTop: "0rem",
          }}
          onClick={() => {
            setActive("Appartement for sale");
            setColor3(true);
            setColor2(false);
            setColor1(false);
          }}
        >
          <img src={imgSale} className="imgSale" />

          <p className="paragraph3">
            Appartement <br />
            for sale
          </p>
        </div>
      </div>
      <div className="scondpart">
        {active === "Hotels" && (
          <div>
            <h1>Hotels</h1>
          </div>
        )}
        {active === "Appartement for sale" && (
          <div>
            <h1>AppartementForSale </h1>
          </div>
        )}
        {active === "Appartement for rent" && (
          <div>
            <h1>AppartementForRent</h1>
          </div>
        )}
      </div>
    </div>
  );
}
export default Content;
