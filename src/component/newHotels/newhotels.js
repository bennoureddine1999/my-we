import axios from "axios";
import React, { component } from "react";
import newhotels from "./newhotels.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import ImageUploading from "react-images-uploading";
import Navbar from "../VavBar/NavBar";
import delet from "../../image/clear.png";
import edit from "../../image//edit.png";

import { Formik } from "formik";
import * as yup from "yup";
import { useHistory, useRouteMatch } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import { NaturePeopleSharp } from "@material-ui/icons";

function Hotels() {
  const [Hotels, setHotels] = useState();
  const [Laoding, setLoiding] = useState(true);
  const [ERROR, setERROR] = useState(false);
  const [Laoding2, setLaoding2] = useState(false);

  const Input = styled("input")({
    display: "none",
  });

  const [images, setImages] = React.useState([]);
  console.log(images);
  const maxNumber = 10;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  useEffect(() => {
    const getdata = async () => {
      try {
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
      <Navbar />
      <div className="newhotelsCard">
        <Formik
          initialValues={{
            title: "",
            province: "",
            photo: "",
            city: "",
            liste: "",
            prix: "",
            content: "",
            phone: "",
            email: "",
          }}
          validationSchema={yup.object().shape({
            title: yup.string().required(),
            province: yup.string().required(),
            city: yup.string().required(),
            liste: yup.string().required(),
            prix: yup.number().required(),
            content: yup.string().required(),
            phone: yup.string().required(),
            email: yup.string().email().required(),
          })}
          onSubmit={async (values, { setsubmitting }) => {
            try {
              console.log(values.photo);

              const response = await axios.post(
                "http://localhost:7000/hotels",
                {
                  title: values.title,
                  province: values.province,
                  photo: values.photo,
                  city: values.city,
                  liste: values.liste,
                  prix: values.prix,
                  content: values.content,
                  phone: values.phone,
                  email: values.email,
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
              <form onSubmit={handleSubmit}>
                <div className="App">
                  <ImageUploading
                    multiples
                    name="photo"
                    value={values.photo}
                    //value={images}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                </div>

                <Box
                  className="boxes"
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {errors.title && touched.title && <div>{errors.title}</div>}
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
                  {errors.province && touched.province && (
                    <div>{errors.province}</div>
                  )}
                  <TextField
                    label="Province"
                    variant="outlined"
                    name="province"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.province}
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
                  {errors.city && touched.city && <div>{errors.city}</div>}
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
                  {errors.liste && touched.liste && <div>{errors.liste}</div>}
                  <TextField
                    label="Tags"
                    variant="outlined"
                    name="liste"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.liste}
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
                  {errors.content && touched.content && (
                    <div>{errors.content}</div>
                  )}
                  <TextField
                    style={{ width: "50%" }}
                    label="Description"
                    variant="outlined"
                    name="content"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.content}
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
                  {errors.phone && touched.phone && <div>{errors.phone}</div>}

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
                  {errors.email && touched.email && <div>{errors.email}</div>}
                  <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </Box>

                <button
                  type="submit"
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  Submit
                </button>
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
