import React from "react";
import storage from "../../fire-base";
// import Image from "../image/image";
import { firestore, storageRef } from "../../fire-base";
import { Fab, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import profile from "./profile.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../VavBar/NavBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import * as Yop from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { width } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import { x } from "joi";
import firebase from "../../fire-base";

function Profile(props) {
  const userlogin = useSelector((state) => state.userlogin);
  const email = userlogin.email;
  console.log(email);
  const [USERS, setUSERS] = useState();
  const [ERROR, setERROR] = useState(false);
  const [Laoding, setLaoding] = useState(true);
  const [Laoding2, setLaoding2] = useState(false);
  const [value, setValue] = useState(null);
  const [gender, setGender] = useState(null);
  const [picture, setPicture] = useState();

  const handlePhoto = (e) => {
    console.log(e.target.files[0]);
    setPicture(e.target.files[0]);
  };

  console.log(gender);

  const Gender = ["male", "female"];
  console.log(USERS);
  useEffect(() => {
    const getdata = async () => {
      try {
        const users = await axios.post("http://localhost:7000/users/email", {
          email,
        });
        const usersJS = users.data;
        console.log(usersJS);
        setUSERS(usersJS.data);
        setLaoding(false);
        console.log("users:", usersJS);
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
      {/* <Image /> */}

      {Laoding ? (
        <div>Loading</div>
      ) : (
        <Formik
          initialValues={{
            name: USERS.name,
            username: USERS.username,
            age: "",
            email: USERS.email,
            password: USERS.password,
            phone: USERS.phone,
            gender: "",
          }}
          validationSchema={Yop.object().shape({
            name: Yop.string().required(),
            username: Yop.string().required(),

            email: Yop.string().email().required(),
            phone: Yop.string().required(),
            password: Yop.string().required(),
            // age: Yop.string().required(),
            // gender: Yop.string().required(),
          })}
          onSubmit={async (values, { setsubmitting }) => {
            console.log("values =", values);

            try {
              const dataForm = new FormData();
              for (let value in values) {
                dataForm.append(value, values[value]);
              }

              dataForm.append("photo", picture);
              const response = await axios.put(
                "http://localhost:7000/users/" + USERS._id,

                dataForm,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              setLaoding2(false);
              toast.success("users updated successfully");
            } catch (error) {
              setLaoding2(false);
              toast.error("this email alredy ");
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <form
                className="card"
                onSubmit={handleSubmit}
                style={{ display: "inline" }}
              >
                <div>Sign up</div>

                {/* <div>
                  <img src={picture} />
                </div> */}
                {/* <form>
                  <input
                    type="file"
                    id="myFile"
                    name="photo"
                    onChange={handlePhoto}
                    onBlur={handleBlur}
                  />
                </form> */}
                <form>
                  <Avatar
                    alt="Remy Sharp"
                    src={picture}
                    sx={{ width: 100, height: 100 }}
                  />

                  <input
                    type="file"
                    id="myFile"
                    name="photo"
                    onChange={handlePhoto}
                    onBlur={handleBlur}
                  />
                </form>
                <Box className="input" style={{ marginTop: "2rem" }}>
                  <TextField
                    style={{ width: "80%" }}
                    required
                    id="outlined-required"
                    label="Name"
                    defaultValue=""
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </Box>
                <Box className="input">
                  <TextField
                    style={{ width: "80%" }}
                    required
                    id="outlined-required"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </Box>

                <Box className="input">
                  <TextField
                    style={{ width: "80%" }}
                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue=""
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </Box>
                <Box className="input">
                  <TextField
                    style={{ width: "80%" }}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </Box>

                <Box className="input">
                  <TextField
                    style={{ width: "80%" }}
                    required
                    id="outlined-required"
                    label="Phone number"
                    defaultValue=""
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                </Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                    marginBottom: "1rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  <div style={{ width: "30%" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        style={{ width: "100%" }}
                        label="Day"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className="DatePicker"
                            style={{
                              width: "100%",
                              marginTop: "1rem",
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  {/* <Box
                    style={{ width: "25%" }}
                    className="boxes"
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {errors.gender && touched.gender && (
                      <div>{errors.gender}</div>
                    )}

                    <Autocomplete
                      style={{ width: "25%" }}
                      className="autocomplete"
                      disablePortal
                      id="combo-box-demo"
                      options={Gender}
                      name="gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Gender"
                          value={values.gender}
                        />
                      )}
                    />
                  </Box> */}
                  <div style={{ width: "28%" }}>
                    <Box className="input">
                      <TextField
                        style={{ width: "80%" }}
                        required
                        id="outlined-required"
                        label="gender"
                        defaultValue=""
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender}
                      />
                    </Box>
                  </div>
                  <div style={{ width: "15%" }}>
                    {" "}
                    <Box className="input" style={{ marginTop: "1rem" }}>
                      {errors.age && touched.age && <div>{errors.age}</div>}
                      <TextField
                        required
                        id="outlined-required"
                        label="Age"
                        defaultValue=""
                        name="age"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.age}
                      />
                    </Box>
                  </div>
                </div>

                <Stack spacing={2} direction="row" className="button">
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ width: "100%", borderRadius: "10px" }}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default Profile;
