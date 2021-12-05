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

import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../fire-base";

import appartementForRent from "./appartement for rent.css";
import { useState, useEffect } from "react";
import { ToastContainer, Toast, toast } from "react-toastify";
import { SpinnerDotted, SpinnerCircularSplit } from "spinners-react";

import { Formik } from "formik";
import Joi, { object } from "joi";
import * as yup from "yup";
import { useHistory, useRouterMatch } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import Donebutton from "../../image/check.png";
import edit from "../../image//edit.png";
import { styled } from "@mui/material/styles";

function AppartementForRent_D() {
  const [A_F_R_D, setA_F_R_D] = useState();
  const [Laoding, setLaoding] = useState(true);
  const [Province, setProvince] = useState();

  const [ERROR, setERROR] = useState(false);
  const [Laoding2, setLaoding2] = useState(false);
  const [classpost, setClasspost] = useState("");
  // const [picture, setPicture] = useState();
  const [loginuserID, setLoginuserID] = useState();

  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState([]);
  const [selectedImage, setSelactedImage] = useState([]);
  const [buttonsubmit, setButtonsubmit] = useState(false);
  const [editbutton, setEditbutton] = useState(false);
  const [inputbutton, setInputbutton] = useState(true);
  console.log("urls", urls);
  console.log("images", images);
  const Input = styled("input")({
    display: "none",
  });

  const userlogin = useSelector((state) => state.userlogin);
  const email = userlogin.email;
  console.log("loginuserID", loginuserID);

  // const handlePhoto = (e) => {
  //   console.log(e.target.files[0]);
  //   setPicture(e.target.files[0]);
  // };

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
    images.map((image) => {
      const storageRef = ref(storage, `/files/${image.id}`);
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
        const a_F_R_D = await fetch(
          "http://localhost:7000/AppartementForRent_D"
        );
        const a_F_R_DJson = await a_F_R_D.json();
        console.log("appartementForRentJson", a_F_R_DJson);
        setA_F_R_D(a_F_R_DJson.data);
        setLaoding(false);
        console.log("appartementForRentJson", a_F_R_DJson);
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
          // photo: "",
          province: "",
          city: "",
          liste: "",
          prix: "",
          rooms: "",
          furthest: "",
          interfaces: "",
          content: "",
          phone: "",
          email: "",
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required(),
          // photo: yup.string().required(),
          // province: yup.string().required(),
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
            dataForm.append("userloginID", loginuserID);
            for (let photo in urls) {
              dataForm.append("photo", urls[photo]);
            }
            dataForm.append("province", Province);

            const response = await axios.post(
              "http://localhost:7000/AppartementForRent_D",
              dataForm,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            setLaoding(false);
            toast.success("AppartementForRent_D created");
          } catch (error) {
            setLaoding(false);
            toast.error("AppartementForRent_D failed to create");
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
              {/* <form>
                <input
                  type="file"
                  id="myFile"
                  name="photo"
                  onChange={handlePhoto}
                  onBlur={handleBlur}
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
              </Box> */}
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
                        // value={values.province}
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
        A_F_R_D.map((value, key) => {
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
                      "http://localhost:7000/AppartementForRent_D/" + value._id
                    );
                    console.log(response);
                    const newA_F_R_D = A_F_R_D.filter(
                      (a_f_r_d) => a_f_r_d._id != value._id
                    );
                    setA_F_R_D(newA_F_R_D);
                    setLaoding2(false);
                    toast.success("a_f_r_d deleted");
                  } catch (error) {
                    setLaoding2(false);
                    toast.error("a_f_r_d failed to deleted");
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

export default AppartementForRent_D;
