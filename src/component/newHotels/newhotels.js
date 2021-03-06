import axios from "axios";
import React, { component } from "react";
import newhotels from "./newhotels.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../fire-base";

import ImageUploading from "react-images-uploading";
import Navbar from "../VavBar/NavBar";
import delet from "../../image/clear.png";
import edit from "../../image//edit.png";
import Autocomplete from "@mui/material/Autocomplete";
import Donebutton from "../../image/check.png";

import { Formik } from "formik";
import * as yup from "yup";
import { useHistory, useRouteMatch } from "react-router-dom";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@mui/material/CircularProgress";

function Hotels(props) {
  const [Hotels, setHotels] = useState();
  const [loginuserID, setLoginuserID] = useState();
  const [Province, setProvince] = useState();
  const [Laoding, setLoiding] = useState(true);
  const [ERROR, setERROR] = useState(false);
  const [Laoding2, setLaoding2] = useState(false);
  // const [picture, setPicture] = useState();
  const [laodingimage, setLaodingimage] = useState(false);

  const userlogin = useSelector((state) => state.userlogin);
  const email = userlogin.email;
  // console.log("loginuserID", loginuserID);
  const Input = styled("input")({
    display: "none",
  });
  console.log("Province", Province);
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

  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);
  const [selectedImage, setSelactedImage] = useState([]);
  const [buttonsubmit, setButtonsubmit] = useState(false);
  const [editbutton, setEditbutton] = useState(false);
  const [inputbutton, setInputbutton] = useState(true);
  const [deletbutton, setDeletbutton] = useState(false);
  console.log("urls", urls);
  console.log("images", images);

  const handlechange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      console.log(fileArray);
      setSelactedImage((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }

    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();

      setImages((prevState) => [...prevState, newImage]);
      console.log("images", images);
    }
    setButtonsubmit(true);
  };
  const renderPhotos = (source) => {
    // console.log("source: ", source);
    return source.map((photo) => {
      return (
        <img
          style={{
            height: "97%",
            marginLeft: "2rem",
            height: "8rem",
          }}
          src={photo}
          alt=""
          key={photo}
        />
      );
    });
  };
  const upladefile = () => {
    const promises = [];
    setLaodingimage(true);
    images.map((image) => {
      const storageRef = ref(storage, `/files/${image.name}`);
      const uplaodeTask = uploadBytesResumable(storageRef, image);
      promises.push(uplaodeTask);
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
      setLaodingimage(false);
      setButtonsubmit(false);
      setEditbutton(true);
      setInputbutton(false);
    });
  };
  const handleedit = () => {
    setUrls([]);
    setImages([]);
    setSelactedImage([]);
    setEditbutton(false);
    setInputbutton(true);
  };
  useEffect(() => {
    const getdata = async () => {
      try {
        const users = await axios.post("http://localhost:7000/users/email", {
          email,
        });
        setLoginuserID(users.data.data._id);
        const hotels = await fetch("http://localhost:7000/hotels");
        const hotelJson = await hotels.json();
        console.log("hotelJson", hotelJson);
        setHotels(hotelJson.data);
        setLoiding(false);
        console.log("hotelJson", hotelJson);
      } catch (error) {
        setERROR(true);
        setLoiding(false);
        console.log("error", error);
      }
    };
    getdata();
  }, []);
  return (
    <div>
      <div className="newhotelsCard">
        <Formik
          initialValues={{
            title: "",
            // province: "",
            // photo: [],
            city: "",
            liste: "",
            prix: "",
            content: "",
            phone: "",
            email: "",
          }}
          validationSchema={yup.object().shape({
            title: yup.string().required(),
            // province: yup.string().required(),
            // photo: yup.array().required(),
            // urls: yup.array(),
            city: yup.string().required(),
            liste: yup.string().required(),
            prix: yup.number().required(),
            content: yup.string().required(),
            phone: yup.string().required(),
            email: yup.string().email().required(),
          })}
          onSubmit={async (values, { setsubmitting }) => {
            try {
              const dataForm = new FormData();
              for (let value in values) {
                dataForm.append(value, values[value]);
              }

              for (let photo in urls) {
                dataForm.append("photo", urls[photo]);
              }
              // dataForm.append("photo", urls);
              dataForm.append("province", Province);

              dataForm.append("userloginID", loginuserID);
              const response = await axios.post(
                "http://localhost:7000/hotels",
                dataForm,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              setLaoding2(false);
              toast.success("hotel created");
            } catch (error) {
              setLaoding2(false);
              toast.error("hotel failed to create");
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
              <form onSubmit={handleSubmit} style={{ position: "relative" }}>
                <div
                  style={{
                    border: "solid 1px black",
                    marginTop: "3rem",
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: "12px",
                    minHeight: "8rem",
                  }}
                >
                  {renderPhotos(selectedImage)}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {inputbutton ? (
                    <label htmlFor="icon-button-file">
                      <Input
                        multiple
                        onChange={handlechange}
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  ) : (
                    false
                  )}

                  {buttonsubmit ? (
                    <>
                      <IconButton
                        aria-label="delete"
                        style={{ marginLeft: "1rem" }}
                        onClick={() => {
                          setUrls([]);
                          setImages([]);
                          setSelactedImage([]);
                          setButtonsubmit(false);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton style={{ marginLeft: "1rem" }}>
                        <img
                          src={Donebutton}
                          style={{ width: "1.5rem" }}
                          onClick={upladefile}
                        />
                      </IconButton>
                    </>
                  ) : (
                    false
                  )}
                  {laodingimage ? (
                    <Box sx={{ display: "flex", width: "15rem" }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    false
                  )}

                  {editbutton ? (
                    <IconButton style={{ marginLeft: "1rem" }}>
                      <img
                        style={{
                          filter:
                            "invert(51%) sepia(0%) saturate(1042%) hue-rotate(285deg) brightness(93%) contrast(102%)",
                          width: "1.6rem",
                        }}
                        src={edit}
                        onClick={handleedit}
                      />
                    </IconButton>
                  ) : (
                    false
                  )}
                </div>
                {/* <form>
                  <input
                    multiple
                    type="file"
                    className="input"
                    onChange={handlechange}
                  />
                </form> */}

                {/* <Box
                  className="boxes"
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {errors.photo && touched.photo && <div>{errors.photo}</div>}
                  <TextField
                    label="photo"
                    variant="outlined"
                    name="photo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.photo}
                  />
                </Box>{" "} */}
                {/* <div className="App">
                  <ImageUploading
                    multiple
                    name="photo"
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <Box className="upload__image-wrapper">
                        <div className="imagesbar">
                          {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                              <div className="imagescadr">
                                {" "}
                                <img
                                  src={image["data_url"]}
                                  alt=""
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </div>
                              <div className="image-item__btn-wrapper">
                                <img
                                  style={{
                                    filter:
                                      "invert(51%) sepia(0%) saturate(1042%) hue-rotate(285deg) brightness(93%) contrast(102%)",
                                    width: "1.6rem",
                                  }}
                                  src={edit}
                                  onClick={() => onImageUpdate(index)}
                                />

                                <img
                                  style={{
                                    filter:
                                      " invert(27%) sepia(85%) saturate(1534%) hue-rotate(350deg) brightness(99%) contrast(87%)",
                                    width: "1.6rem",
                                    marginLeft: "1rem",
                                  }}
                                  src={delet}
                                  onClick={() => onImageRemove(index)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                          />
                        </IconButton>
                        &nbsp;
                        <IconButton
                          aria-label="delete"
                          onClick={onImageRemoveAll}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                  </ImageUploading>
                </div> */}
                <div style={{ display: "flex" }}>
                  <div>
                    <Box
                      className="boxes"
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {errors.title && touched.title && (
                        <div>{errors.title}</div>
                      )}
                      <TextField
                        label="title"
                        variant="outlined"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                    </Box>

                    <Box
                      className="boxes"
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {errors.prix && touched.prix && <div>{errors.prix}</div>}
                      <TextField
                        label="Prix"
                        variant="outlined"
                        name="prix"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.prix}
                      />
                    </Box>

                    <Box
                      className="boxes"
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {errors.phone && touched.phone && (
                        <div>{errors.phone}</div>
                      )}

                      <TextField
                        label="Phone number"
                        variant="outlined"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                      />
                    </Box>

                    <Box
                      className="boxes"
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {errors.email && touched.email && (
                        <div>{errors.email}</div>
                      )}
                      <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                    </Box>
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <Box
                        className="boxes"
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        {/* {errors.province && touched.province && (
                          <div>{errors.province}</div>
                        )} */}

                        <Autocomplete
                          className="autocomplete"
                          disablePortal
                          id="combo-box-demo"
                          options={province}
                          onChange={(event, value) => {
                            setProvince(value);
                          }}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="province"
                              name="province"

                              // onChange={handleChange}

                              // onBlur={handleBlur}
                              // value={values.province}
                            />
                          )}
                        />
                      </Box>
                      <Box
                        className="boxes"
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        {errors.city && touched.city && (
                          <div>{errors.city}</div>
                        )}
                        <TextField
                          label="City"
                          variant="outlined"
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                        />
                      </Box>
                      <Box
                        className="boxes"
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        {errors.liste && touched.liste && (
                          <div>{errors.liste}</div>
                        )}
                        <TextField
                          label="Tags"
                          variant="outlined"
                          name="liste"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.liste}
                        />
                      </Box>
                    </div>
                    <Box
                      style={{ width: "100%" }}
                      className="boxes"
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      {errors.content && touched.content && (
                        <div>{errors.content}</div>
                      )}

                      <TextField
                        style={{ width: "60%" }}
                        label="Description"
                        multiline
                        maxRows={4}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.content}
                        name="content"
                      />
                    </Box>
                  </div>
                </div>
                <Button
                  style={{
                    position: "absolute",
                    right: "0",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>

      <ToastContainer />
    </div>
  );
}
export default Hotels;
