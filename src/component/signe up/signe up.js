import axios from "axios";
import React from "react";
import signup from "./signe up.css";
import { useState, useEffect } from "react";
import { SpinnerDotted, SpinnerCircularSplit } from "spinners-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import Joi from "joi";
import * as Yop from "yup";
import { useHistory, useRouteMatch } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function SignUp() {
  const [USERS, setUSERS] = useState();
  const [Laoding, setLaoding] = useState(true);
  const [ERROR, setERROR] = useState(false);
  const [Laoding2, setLaoding2] = useState(false);
  const history = useHistory();
  const { path, url } = useRouteMatch;
  const [value, setValue] = React.useState(null);

  useEffect(() => {
    const getdata = async () => {
      try {
        const users = await fetch("http://localhost:7000/users");
        const usersJSON = await users.json();
        console.log("usersJSON:", usersJSON);
        setUSERS(usersJSON.data);
        setLaoding(false);
        console.log("users:", usersJSON);
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
          name: "",
          username: "",
          age: "",
          email: "",
          password: "",
          phone: "",
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
            const response = await axios.post("http://localhost:7000/users", {
              name: values.name,
              username: values.username,
              email: values.email,
              phone: values.phone,
              password: values.password,
              // age: values.age,
              // gender: values.gender,
            });

            setLaoding2(false);
            toast.success("users created");
            // window.location = "./logIN";
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
            <form className="signupCard" onSubmit={handleSubmit}>
              <h1 className="SignUp">Sign up</h1>
              <p className="paragraph">It's free and only takes a minuts</p>
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
                  defaultValue=""
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
                  style={{ width: "80%", marginBottom: "3rem" }}
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

      <ToastContainer />
    </div>
  );
}

export default SignUp;
