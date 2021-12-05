import React from "react";
// import Image from "../image/image";
import { firestore, storageRef } from "../../fire-base";
import { Fab, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import profile from "./Editprofile.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../fire-base";
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
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { styled } from "@mui/material/styles";
import SaveIcon from "@material-ui/icons/Save";
import LoadingButton from "@material-ui/lab/LoadingButton";
import Donebutton from "../../image/check.png";
import edit from "../../image//edit.png";

function Editprofile(props) {
  const history = useHistory();
  const userlogin = useSelector((state) => state.userlogin);
  const email = userlogin.email;
  console.log(email);
  const [USERS, setUSERS] = useState();
  const [ERROR, setERROR] = useState(false);
  const [Laoding, setLaoding] = useState(true);
  const [Laoding2, setLaoding2] = useState(false);
  const [dateofbirth, setDatofbirth] = useState(null);
  const [gender, setGender] = useState(null);

  const [images, setImages] = useState();
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState();
  const [selectedImage, setSelactedImage] = useState();
  const [buttonsubmit, setButtonsubmit] = useState(false);
  const [editbutton, setEditbutton] = useState(false);
  const [inputbutton, setInputbutton] = useState(true);

  console.log("selectedImage", selectedImage);
  console.log("urls", urls);
  console.log("dattofbirth", dateofbirth);
  console.log("images", images);
  console.log(USERS);

  // const handlePhoto = (e) => {
  //   console.log(e.target.files[0]);
  //   setPicture(e.target.files[0]);
  // };

  // console.log(gender);

  const Gender = ["male", "female"];
  const Input = styled("input")({
    display: "none",
  });

  const handlechange = (e) => {
    // if (e.target.files) {
    // const fileArray = Array.from(e.target.files).map(
    // (file) => URL.createObjectURL(file);
    const fileArray = URL.createObjectURL(...e.target.files);
    // );
    console.log("fileArray", fileArray);
    // setSelactedImage((prevImages) => prevImages.concat(fileArray));
    // Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    setSelactedImage(fileArray);
    // }

    // for (let i = 0; i < e.target.files.length; i++) {
    const newImage = e.target.files[0];
    newImage["id"] = Math.random();
    setImages(newImage);
    // setImages((prevState) => [...prevState, newImage]);
    console.log("images", images);
    // }
    setButtonsubmit(true);
  };
  const upladefile = () => {
    const promises = [];
    // images.map((image) => {
    const storageRef = ref(storage, `/files/${images.id}`);
    const uplaodeTask = uploadBytesResumable(storageRef, images);
    // promises.push(uplaodeTask);
    uplaodeTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uplaodeTask.snapshot.ref).then((urls) => {
          console.log("urls", urls);
          setUrls((prevState) => [...prevState, urls]);
        });
      }
    );
    setButtonsubmit(false);
    setEditbutton(true);
    setInputbutton(false);
    // });
  };
  // const handleedit = () => {
  //   setUrls([]);
  //   setImages([]);
  //   setSelactedImage([]);
  //   setEditbutton(false);
  //   setInputbutton(true);
  // };
  useEffect(() => {
    const getdata = async () => {
      try {
        const users = await axios.post("http://localhost:7000/users/email", {
          email,
        });
        const usersJS = users.data;
        console.log(usersJS);
        setUSERS(usersJS.data);
        // setGender(USERS.gender);

        setLaoding(false);
        setDatofbirth(usersJS.data.dateofbirth);
        setGender(usersJS.data.gender);
        setSelactedImage(usersJS.data.photo);
        setUrls(usersJS.data.photo);

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
            age: USERS.age,
            email: USERS.email,
            password: USERS.password,
            phone: USERS.phone,
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
              setLaoding2(true);

              const dataForm = new FormData();
              for (let value in values) {
                dataForm.append(value, values[value]);
              }
              dataForm.append("photo", urls);
              dataForm.append("dateofbirth", dateofbirth);
              dataForm.append("gender", gender);

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
              history.push("/profile");
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
                className="editcard"
                onSubmit={handleSubmit}
                style={{ display: "block" }}
              >
                <div className="backgrounddiv"></div>
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
                </form> */}{" "}
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    // border: "solid 2px black",
                    width: "30%",
                  }}
                >
                  <Avatar
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "-6rem",
                      border: "solid 1px gray",
                    }}
                    alt="Remy Sharp"
                    src={selectedImage}
                    // src={selectedImage == [] ? USERS.photo : selectedImage}
                    sx={{ width: 190, height: 190 }}
                  />
                  <label
                    style={{
                      // border: "solid 2px black",
                      marginLeft: "5rem",
                      marginTop: "0rem",
                    }}
                  >
                    <Input
                      onChange={handlechange}
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setUrls();
                        setImages();
                        setSelactedImage();
                        setButtonsubmit(true);
                      }}
                    >
                      <img
                        style={{
                          filter:
                            "invert(51%) sepia(0%) saturate(1042%) hue-rotate(285deg) brightness(93%) contrast(102%)",
                          width: "1.6rem",
                        }}
                        src={edit}
                      />
                    </IconButton>
                  </label>
                  {buttonsubmit ? (
                    <IconButton style={{ marginLeft: "1rem" }}>
                      <img
                        style={{}}
                        src={Donebutton}
                        style={{ width: "1.5rem" }}
                        onClick={upladefile}
                      />
                    </IconButton>
                  ) : (
                    false
                  )}
                </div>
                <Box className="input" style={{ marginTop: "4rem" }}>
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
                    style={{ width: "80%", marginTop: "1rem" }}
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
                    style={{ width: "80%", marginTop: "1rem" }}
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
                    style={{ width: "80%", marginTop: "1rem" }}
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
                    style={{ width: "80%", marginTop: "1rem" }}
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
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <div style={{ width: "30%" }} className="input">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        // initialValue={USERS.dateofbirth}
                        style={{ width: "100%" }}
                        label="Basic example"
                        value={dateofbirth}
                        onChange={(value) => {
                          setDatofbirth(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            style={{
                              width: "100%",
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  <Box
                    style={{ width: "25%" }}
                    className="input"
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
                      style={{ width: "100%", marginTop: "0rem" }}
                      className="input"
                      disablePortal
                      // initialValue={USERS.gender}
                      id="combo-box-demo"
                      options={Gender}
                      value={gender}
                      name="gender"
                      onChange={(event, value) => {
                        setGender(value);
                        console.log("gender", gender);
                      }}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Gender" />
                      )}
                    />
                  </Box>
                  {/* <div style={{ width: "28%" }}>
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
                  </div> */}
                  <div style={{ width: "15%" }} className="input">
                    {" "}
                    <Box>
                      {errors.age && touched.age && <div>{errors.age}</div>}
                      <TextField
                        required
                        id="outlined-required"
                        label="Age"
                        name="age"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.age}
                      />
                    </Box>
                  </div>
                </div>
                <Stack spacing={2} direction="row" className="savebuttondiv">
                  <LoadingButton
                    // color="secondary"
                    type="submit"
                    loading={Laoding2}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    style={{
                      width: "40%",

                      borderRadius: "10px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Save
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    style={{ width: "40%" }}
                    onClick={() => {
                      history.push("/profile");
                    }}
                  >
                    Cancel
                  </Button>

                  {/* <Button
                    disabled={Laoding2}
                    variant="contained"
                    type="submit"
                    style={{ width: "100%", borderRadius: "10px" }}
                  >
                    Submit
                  </Button> */}
                </Stack>
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default Editprofile;
