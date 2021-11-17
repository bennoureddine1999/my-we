import React from "react";
import logincc from "./login.css";
import Box from "@mui/material/Box";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import { LOGIN } from "../../action/action";

import Stack from "@mui/material/Stack";

function LogIn() {
  const dispatch = useDispatch();
  const [USERS, setUSERS] = useState();
  const [Laoding, setLaoding] = useState(true);
  const [ERROR, setERROR] = useState(false);
  const userlogin = useSelector((state) => state.userlogin);

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
          email: "",
          password: "",
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().required(),
        })}
        onSubmit={async (values, { setsubmitting }) => {
          console.log("values", values);

          try {
            const responses = await axios.post(
              "http://localhost:7000/users/login",
              {
                email: values.email,
                password: values.password,
              }
            );
            const loginuser = await USERS.find(
              (user) => user.email == values.email
            );

            dispatch(
              LOGIN({
                email: values.email,
                login: true,
              })
            );
            //console.log("dispatched");
            //console.log(loginuser);
            //console.log(userlogin.login);

            window.location = "/";
          } catch (error) {
            console.log("error");
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
            <form onSubmit={handleSubmit} className="logincard">
              <h1 className="login">Log in</h1>

              <Box className="input" style={{ marginTop: "2rem" }}>
                <TextField
                  style={{ width: "80%" }}
                  required
                  label="Email"
                  defaultValue=""
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </Box>
              <Box
                className="input"
                style={{ marginTop: "2rem", marginBottom: "1.5rem" }}
              >
                <TextField
                  style={{ width: "80%" }}
                  required
                  id="outlined-required"
                  label="Password"
                  defaultValue=""
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </Box>
              <Stack className="loginbutton">
                <Button
                  className="loginbutton"
                  variant="contained"
                  type="submit"
                  style={{ width: "100%", marginBottom: "-1rem" }}
                >
                  Log in
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
export default LogIn;
