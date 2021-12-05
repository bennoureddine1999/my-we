import React from "react";
import content from "./content.css";
import { useState } from "react";
import imgRent from "../../image/rent.png";
import imgSale from "../../image/sale.png";
import imghotel from "../../image/hotel.png";
import { color, style } from "@mui/system";
import { useHistory, useRouteMatch } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Content(props) {
  const history = useHistory();

  const [active, setActive] = useState("Hotels");
  const [Laoding2, setLaoding2] = useState(false);

  const [color1, setColor1] = useState(true);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);
  const [color4, setColor4] = useState(false);

  const btn_class1 = color1 ? "bluebutton" : "withbutton";
  const btn_class2 = color2 ? "bluebutton" : "withbutton";
  const btn_class3 = color3 ? "bluebutton" : "withbutton";
  const btn_class4 = color4 ? "bluebutton" : "withbutton";

  const [Province, setProvince] = useState("");
  // console.log(Province);
  // console.log(Hotel);

  const province = [
    "01- Adrar",
    "02- Chlef",
    "03- Laghouat",
    "04- Oum El Bouaghi",
    "05- Batna",
    "06- Béjaïa",
    "07- Biskra",
    "08- Béchar",
    "09- Blida",
    "10- Bouira",
    "11- Tamanrasset",
    "12- Tébessa",
    "13- Tlemcen",
    "14- Tiaret",
    "15- Tizi Ouzou",
    "16- Alger",
    "17- Djelfa",
    "18- Jijel",
    "19- Sétif",
    "20- Saïda",
    "21- Skikda",
    "22- Sidi Bel Abbès",
    "23- Annaba",
    "24- Guelma",
    "25- Constantine",
    "26- Médéa",
    "27- Mostaganem",
    "28- M'Sila",
    "29- Mascara",
    "30- Ouargla",
    "31- Oran",
    "32- El Bayadh",
    "33- Illizi",
    "34- Bordj Bou Arreridj",
    "35- Boumerdès",
    "36- El Tarf",
    "37- Tindouf",
    "38- Tissemsilt",
    "39- El Oued",
    "40- Khenchela",
    "41- Souk Ahras",
    "42- Tipaza",
    "43- Mila",
    "44- Aïn Defla",
    "45- Naâma",
    "46- Aïn Témouchent",
    "47- Ghardaïa",
    "48- Relizane",
  ];
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
            setColor4(false);
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
            setActive("Appartement for rent daily");
            setColor2(true);
            setColor1(false);
            setColor3(false);
            setColor4(false);
          }}
        >
          <img className="imgRent" src={imgRent} />

          <p className="paragraph2">
            Apartment <br />
            for rent daily
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
            setActive("Appartement for rent monthly");
            setColor3(true);
            setColor1(false);
            setColor2(false);
            setColor4(false);
          }}
        >
          <img className="imgRent" src={imgRent} />

          <p className="paragraph2">
            Apartment <br />
            for rent monthly
          </p>
        </div>
        <div
          className={btn_class4}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "33%",
            marginTop: "0rem",
          }}
          onClick={() => {
            setActive("Appartement for sale");
            setColor4(true);
            setColor2(false);
            setColor1(false);
            setColor3(false);
          }}
        >
          <img src={imgSale} className="imgSale" />

          <p className="paragraph3">
            Apartment <br />
            for sale
          </p>
        </div>
      </div>
      <div className="scondpart">
        <div>
          {active === "Hotels" && (
            <div>
              <Box
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="boxes"
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Autocomplete
                  style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={province}
                  sx={{ width: 300 }}
                  onChange={(event, value) => {
                    setProvince(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "100%%" }}
                      {...params}
                      label="Province"
                    />
                  )}
                />
              </Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Day"
                  value={props.date}
                  onChange={(newValue) => {
                    props.setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="DatePicker"
                      style={{
                        marginLeft: "2rem",
                        marginTop: "1rem",
                        width: "45%",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                style={{
                  marginLeft: "3rem",
                  marginTop: "1rem",
                  width: "33%",
                }}
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  onChange={(e) => {
                    props.setDay(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">day</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "day",
                  }}
                />
              </FormControl>
              <Stack spacing={2} direction="row" className="button">
                <Button
                  variant="contained"
                  type="submit"
                  style={{ width: "100%", borderRadius: "10px" }}
                  disabled={Laoding2}
                  onClick={async (e) => {
                    e.preventDefault();
                    setLaoding2(true);
                    try {
                      const response = await axios.post(
                        "http://localhost:7000/hotels/search",
                        {
                          Province,
                        }
                      );
                      const hotels = await fetch(
                        "http://localhost:7000/hotels"
                      );

                      const hotelJson = await hotels.json();
                      console.log("hotelJson", hotelJson);
                      // props.setHotels(hotelJson.data);
                      const hotelsearch = response.data.data;
                      // props.setHotel(hotelsearch);

                      // {
                      //   Province === ""
                      //     ? props.setHotel(hotelJson.data)
                      //     : props.setHotel(hotelsearch);
                      // }
                      // props.setSearch(true);
                      {
                        Province === ""
                          ? props.setSearch(hotelJson.data)
                          : props.setSearch(hotelsearch);
                      }

                      setLaoding2(false);
                      history.push("/");
                    } catch (error) {
                      setLaoding2(false);
                      toast.error("users failed to create");
                    }
                  }}
                >
                  Search
                </Button>
              </Stack>
            </div>
          )}
          {active === "Appartement for rent daily" && (
            <div>
              <Box
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="boxes"
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Autocomplete
                  style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={province}
                  sx={{ width: 300 }}
                  onChange={(event, value) => {
                    setProvince(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "100%%" }}
                      {...params}
                      label="Province"
                    />
                  )}
                />
              </Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Day"
                  value={props.date}
                  onChange={(newValue) => {
                    props.setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="DatePicker"
                      style={{
                        marginLeft: "2rem",
                        marginTop: "1rem",
                        width: "45%",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                style={{
                  marginLeft: "3rem",
                  marginTop: "1rem",
                  width: "33%",
                }}
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  onChange={(e) => {
                    props.setDay(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">day</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "day",
                  }}
                />
              </FormControl>
              <Stack spacing={2} direction="row" className="button">
                <Button
                  variant="contained"
                  type="submit"
                  style={{ width: "100%", borderRadius: "10px" }}
                  disabled={Laoding2}
                  onClick={async (e) => {
                    e.preventDefault();
                    setLaoding2(true);
                    try {
                      const response = await axios.post(
                        "http://localhost:7000/AppartementForRent_D/search",
                        {
                          Province,
                        }
                      );
                      const a_F_R_D = await fetch(
                        "http://localhost:7000/AppartementForRent_D"
                      );
                      const a_F_R_DJson = await a_F_R_D.json();
                      console.log("appartementForRentDJson", a_F_R_DJson);
                      // props.setHotels(hotelJson.data);
                      const a_F_R_Dsearch = response.data.data;
                      // props.setHotel(hotelsearch);

                      // {
                      //   Province === ""
                      //     ? props.set_A_f_r_d(a_F_R_DJson.data)
                      //     : props.set_A_f_r_d(a_F_R_Dsearch);
                      // }
                      {
                        Province === ""
                          ? props.setSearch(a_F_R_DJson.data)
                          : props.setSearch(a_F_R_Dsearch);
                      }
                      // props.setSearch(true);

                      setLaoding2(false);
                      history.push("/");
                    } catch (error) {
                      setLaoding2(false);
                      toast.error("users failed to create");
                    }
                  }}
                >
                  Search
                </Button>
              </Stack>
            </div>
          )}
          {active === "Appartement for rent monthly" && (
            <div>
              <Box
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="boxes"
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Autocomplete
                  style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={province}
                  sx={{ width: 300 }}
                  onChange={(event, value) => {
                    setProvince(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "100%%" }}
                      {...params}
                      label="Province"
                    />
                  )}
                />
              </Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Day"
                  value={props.date}
                  onChange={(newValue) => {
                    props.setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="DatePicker"
                      style={{
                        marginLeft: "2rem",
                        marginTop: "1rem",
                        width: "45%",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                style={{
                  marginLeft: "3rem",
                  marginTop: "1rem",
                  width: "33%",
                }}
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  onChange={(e) => {
                    props.setDay(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">day</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "day",
                  }}
                />
              </FormControl>
              <Stack spacing={2} direction="row" className="button">
                <Button
                  variant="contained"
                  type="submit"
                  style={{ width: "100%", borderRadius: "10px" }}
                  disabled={Laoding2}
                  onClick={async (e) => {
                    e.preventDefault();
                    setLaoding2(true);
                    try {
                      const response = await axios.post(
                        "http://localhost:7000/AppartementForRent_M/search",
                        {
                          Province,
                        }
                      );
                      const a_F_R_M = await fetch(
                        "http://localhost:7000/AppartementForRent_M"
                      );
                      const a_F_R_MJson = await a_F_R_M.json();
                      console.log("appartementForRentMJson", a_F_R_MJson);
                      // props.setHotels(hotelJson.data);
                      const a_F_R_Msearch = response.data.data;
                      // props.setHotel(hotelsearch);

                      // {
                      //   Province === ""
                      //     ? props.set_A_f_r_m(a_F_R_MJson.data)
                      //     : props.set_A_f_r_m(a_F_R_Msearch);
                      // }
                      // props.setSearch(true);
                      {
                        Province === ""
                          ? props.setSearch(a_F_R_MJson.data)
                          : props.setSearch(a_F_R_Msearch);
                      }

                      setLaoding2(false);
                      history.push("/");
                    } catch (error) {
                      setLaoding2(false);
                      toast.error("users failed to create");
                    }
                  }}
                >
                  Search
                </Button>
              </Stack>
            </div>
          )}
          {active === "Appartement for sale" && (
            <div>
              <Box
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="boxes"
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Autocomplete
                  style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  disablePortal
                  id="combo-box-demo"
                  options={province}
                  sx={{ width: 300 }}
                  onChange={(event, value) => {
                    setProvince(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "100%%" }}
                      {...params}
                      label="Province"
                    />
                  )}
                />
              </Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Day"
                  value={props.date}
                  onChange={(newValue) => {
                    props.setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="DatePicker"
                      style={{
                        marginLeft: "2rem",
                        marginTop: "1rem",
                        width: "45%",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                style={{
                  marginLeft: "3rem",
                  marginTop: "1rem",
                  width: "33%",
                }}
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  onChange={(e) => {
                    props.setDay(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">day</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "day",
                  }}
                />
              </FormControl>
              <Stack spacing={2} direction="row" className="button">
                <Button
                  variant="contained"
                  type="submit"
                  style={{ width: "100%", borderRadius: "10px" }}
                  disabled={Laoding2}
                  onClick={async (e) => {
                    e.preventDefault();
                    setLaoding2(true);
                    try {
                      const response = await axios.post(
                        "http://localhost:7000/AppartementForSale/search",
                        {
                          Province,
                        }
                      );
                      const a_F_S = await fetch(
                        "http://localhost:7000/AppartementForSale"
                      );
                      const a_F_SJson = await a_F_S.json();
                      console.log("appartementForsale", a_F_SJson);
                      // props.setHotels(hotelJson.data);
                      const a_F_Ssearch = response.data.data;
                      // props.setHotel(hotelsearch);

                      // {
                      //   Province === ""
                      //     ? props.set_A_f_s(a_F_SJson.data)
                      //     : props.set_A_f_s(a_F_Ssearch);
                      // }
                      // props.setSearch(true);
                      {
                        Province === ""
                          ? props.setSearch(a_F_SJson.data)
                          : props.setSearch(a_F_Ssearch);
                      }

                      setLaoding2(false);
                      history.push("/");
                    } catch (error) {
                      setLaoding2(false);
                      toast.error("users failed to create");
                    }
                  }}
                >
                  Search
                </Button>
              </Stack>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Content;
