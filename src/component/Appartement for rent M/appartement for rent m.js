import react from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";

import appartementForRent from "./appartement for rent.css";
import { useState, useEffect } from "react";
import { ToastContainer, Toast, toast } from "react-toastify";
import { SpinnerDotted, SpinnerCircularSplit } from "spinners-react";

import { Formik } from "formik";
import Joi, { object } from "joi";
import * as yup from "yup";
import { useHistory, useRouterMatch } from "react-router-dom";

function AppartementForRent_M() {
  const [A_F_R_M, setA_F_R_M] = useState();
  const [Laoding, setLaoding] = useState(true);
  const [ERROR, setERROR] = useState(false);
  const [Laoding2, setLaoding2] = useState(false);
  const [picture, setPicture] = useState();
  const [loginuserID, setLoginuserID] = useState();

  const userlogin = useSelector((state) => state.userlogin);
  const email = userlogin.email;
  console.log(loginuserID);

  const handlePhoto = (e) => {
    console.log(e.target.files[0]);
    setPicture(e.target.files[0]);
  };
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

  useEffect(() => {
    const getdata = async () => {
      try {
        const users = await axios.post("http://localhost:7000/users/email", {
          email,
        });
        setLoginuserID(users.data.data._id);
        const a_F_R_M = await fetch(
          "http://localhost:7000/AppartementForRent_M"
        );
        const a_F_R_MJson = await a_F_R_M.json();
        console.log("appartementForRentJson", a_F_R_MJson);
        setA_F_R_M(a_F_R_MJson.data);
        setLaoding(false);
        console.log("appartementForRentJson", a_F_R_MJson);
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
      <Formik
        initialValues={{
          title: "",
          photo: "",
          province: "",
          city: "",
          liste: "",
          prix: "",
          rooms: " ",
          furthest: " ",
          interfaces: " ",
          content: "",
          phone: "",
          email: "",
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required(),
          // photo: yup.string().required(),
          province: yup.string().required(),
          city: yup.string().required(),
          liste: yup.string().required(),
          prix: yup.number().required(),
          rooms: yup.number().required(),
          furthest: yup.number().required(),
          interfaces: yup.number().required(),
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
            console.log("values", values);

            dataForm.append("photo", picture);

            dataForm.append("userloginID", loginuserID);
            const response = await axios.post(
              "http://localhost:7000/AppartementForRent_M",
              dataForm,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            setLaoding(false);
            toast.success("AppartementForRent_M created");
          } catch (error) {
            setLaoding(false);
            toast.error("AppartementForRent_M failed to create");
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
              <form>
                <input
                  type="file"
                  id="myFile"
                  name="photo"
                  onChange={handlePhoto}
                  onBlur={handleBlur}
                />
              </form>
              {/* <div className="App">
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
                      {errors.province && touched.province && (
                        <div>{errors.province}</div>
                      )}

                      <Autocomplete
                        className="autocomplete"
                        disablePortal
                        id="combo-box-demo"
                        options={province}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="province"
                            name="province"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.province}
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
                      {errors.rooms && touched.rooms && (
                        <div>{errors.rooms}</div>
                      )}

                      <TextField
                        label="rooms"
                        variant="outlined"
                        name="rooms"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rooms}
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
                      {errors.furthest && touched.furthest && (
                        <div>{errors.furthest}</div>
                      )}

                      <TextField
                        label="furthest"
                        variant="outlined"
                        name="furthest"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.furthest}
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
                      {errors.interfaces && touched.interfaces && (
                        <div>{errors.interfaces}</div>
                      )}

                      <TextField
                        label="interfaces"
                        variant="outlined"
                        name="interfaces"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.interfaces}
                      />
                    </Box>
                  </div>
                </div>
              </div>
              <Button
                style={{
                  position: "absolute",
                  right: "0",
                }}
                type="submit"
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
      {/* {Laoding ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <SpinnerDotted
            size={70}
            thickness={100}
            speed={100}
            color="#36ad47"
          />
        </div>
      ) : ERROR ? (
        <div>Error</div>
      ) : (
        A_F_R_M.map((value, key) => {
          return (
            <li>
              {value.title}

              <button
                style={{ marginLeft: "2rem" }}
                onClick={async (e) => {
                  e.preventDefault();
                  setLaoding2(true);
                  console.log("click", value);
                  try {
                    const response = await axios.delete(
                      "http://localhost:7000/AppartementForRent_M/" + value._id
                    );
                    console.log(response);
                    const newA_F_R_M = A_F_R_M.filter(
                      (a_f_r_m) => a_f_r_m._id != value._id
                    );
                    setA_F_R_M(newA_F_R_M);
                    setLaoding2(false);
                    toast.success("a_f_r_m deleted");
                  } catch (error) {
                    setLaoding2(false);
                    toast.error("a_f_r_m failed to deleted");
                  }
                }}
              >
                dellet
              </button>
            </li>
          );
        })
      )} */}

      <ToastContainer />
    </div>
  );
}

export default AppartementForRent_M;
