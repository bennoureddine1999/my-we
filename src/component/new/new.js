import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";

import Navbar from "../VavBar/NavBar";
import New from "./new.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Appartement_for_sale from "../Appartement for sale/appartement for sale";
import AppartementForRent_M from "../Appartement for rent M/appartement for rent m";
import AppartementForRent_D from "../Appartement for rent D/appartement for rent d";
import NewHotel from "../newHotels/newhotels";

const Creat_new_post = () => {
  const history = useHistory();
  const [classpost, setClasspost] = React.useState("");
  const [userloginID, setuserloginID] = useState();
  const [hotelcard, setHotelcard] = useState();
  const [AFScard, setAFScard] = useState();
  const [AFRMcard, setAFRMcard] = useState();
  const [AFRDcard, setAFRDcard] = useState();

  const options = [
    "Hotel",
    "Apartment For Rent monthly",
    "Apartment For Rent daily",
    "Apartment For Sale",
  ];

  const steps = ["Select your category", "Fill in the information"];
  console.log(classpost);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const userlogin = useSelector((state) => state.userlogin);
  const email = userlogin.email;
  console.log("loginuserID", userloginID);
  // console.log("hotelcard", hotelcard);
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (classpost == "") {
      return console.log("error");
    } else {
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    window.location.reload();
  };
  useEffect(() => {
    const getdata = async () => {
      try {
        const users = await axios.post("http://localhost:7000/users/email", {
          email,
        });
        setuserloginID(users.data.data._id);
      } catch (error) {
        console.log("error", error);
      }
    };
    getdata();
  }, []);

  return (
    <>
      <Navbar />
      <button
        style={{ width: "5rem" }}
        onClick={async (e) => {
          e.preventDefault();
          try {
            const gethotelcard = await axios.post(
              "http://localhost:7000/hotels/findcard",
              {
                userloginID,
              }
            );
            console.log("gethotelcard", gethotelcard.data.data);
            setHotelcard(gethotelcard.data.data);
            const getAFScard = await axios.post(
              "http://localhost:7000/AppartementForSale/findcard",
              {
                userloginID,
              }
            );
            console.log("getAFScard", getAFScard.data.data);
            setAFScard(getAFScard.data.data);
            const getAFRMcard = await axios.post(
              "http://localhost:7000/AppartementForRent_M/findcard",
              {
                userloginID,
              }
            );
            console.log("getAFRMcard", getAFRMcard.data.data);
            setAFRMcard(getAFRMcard.data.data);

            const getAFRDcard = await axios.post(
              "http://localhost:7000/AppartementForRent_D/findcard",
              {
                userloginID,
              }
            );
            console.log("getAFRDcard", getAFRDcard.data.data);
            setAFRDcard(getAFRDcard.data.data);
          } catch (error) {
            console.log("error", error);
          }
        }}
      >
        See your card
      </button>
      <div className="title">
        <h1>Creat new post </h1>
      </div>

      <Box sx={{ width: "100%" }} className="form">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            // if (isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : activeStep === 0 ? (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}

            <Autocomplete
              className="autocomplete"
              disablePortal
              id="combo-box-demo"
              options={options}
              onChange={(event, value) => {
                setClasspost(value);
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Select" />}
            />

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              <Button onClick={handleNext}>Next</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment className="content">
            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
            {classpost === "Hotel" && <NewHotel />}
            {classpost === "Apartment For Rent monthly" && (
              <AppartementForRent_M />
            )}
            {classpost === "Apartment For Rent daily" && (
              <AppartementForRent_D />
            )}
            {classpost === "Apartment For Sale" && <Appartement_for_sale />}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
};
export default Creat_new_post;
