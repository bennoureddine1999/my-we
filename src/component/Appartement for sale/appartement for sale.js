import react from "react";
import axios from "axios";

import appartementForsale from "./appartement for sale.css";
import { useState, useEffect } from "react";
import { ToastContainer, Toast, toast } from "react-toastify";
import { SpinnerDotted, SpinnerCircularSplit } from "spinners-react";

import { Formik } from "formik";
import Joi, { object } from "joi";
import * as yup from "yup";
import { useHistory, useRouterMatch } from "react-router-dom";

function Appartement_for_sale() {
  const [A_F_S, setA_F_S] = useState();
  const [Laoding, setLaoding] = useState(true);
  const [ERROR, setERROR] = useState(false);
  const [Laoding2, setLaoding2] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      try {
        const a_F_S = await fetch("http://localhost:7000/AppartementForSale");
        const a_F_SJson = await a_F_S.json();
        console.log("appartementForRentJson", a_F_SJson);
        setA_F_S(a_F_SJson.data);
        setLaoding(false);
        console.log("appartementForSaleJson", a_F_SJson);
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
          gps: "",
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
          photo: yup.string().required(),
          gps: yup.string().required(),
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
            const response = await axios.post(
              "http://localhost:7000/AppartementForSale",
              {
                title: values.title,
                photo: values.photo,
                gps: values.gps,
                liste: values.liste,
                prix: values.prix,
                rooms: values.rooms,
                furthest: values.furthest,
                interfaces: values.interfaces,
                content: values.content,
                phone: values.phone,
                email: values.email,
              }
            );
            setLaoding(false);
            toast.success("AppartementForSale created");
          } catch (error) {
            setLaoding(false);
            toast.error("AppartementForSale failed to create");
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
              <div style={{ display: "flex" }}>
                {errors.title && touched.title && <div>{errors.title}</div>}
                <label>Title:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.photo && touched.photo && <div>{errors.photo}</div>}
                <label>photo:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="photo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.photo}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.gps && touched.gps && <div>{errors.gps}</div>}
                <label>gps:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="gps"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gps}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.liste && touched.liste && <div>{errors.liste}</div>}
                <label>liste:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="liste"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.liste}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.prix && touched.prix && <div>{errors.prix}</div>}
                <label>prix:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="prix"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.prix}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.rooms && touched.rooms && <div>{errors.rooms}</div>}
                <label>rooms:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="rooms"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rooms}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.furthest && touched.furthest && (
                  <div>{errors.furthest}</div>
                )}
                <label>furthest:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="furthest"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.furthest}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.interfaces && touched.interfaces && (
                  <div>{errors.interfaces}</div>
                )}
                <label>interfaces:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="interfaces"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.interfaces}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.content && touched.content && (
                  <div>{errors.content}</div>
                )}
                <label>liste:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.phone && touched.phone && <div>{errors.phone}</div>}
                <label>phone:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
              </div>
              <div style={{ display: "flex" }}>
                {errors.email && touched.email && <div>{errors.email}</div>}
                <label>email:</label>
                <input
                  style={{ marginLeft: "2rem" }}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </Formik>
      {Laoding ? (
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
        A_F_S.map((value, key) => {
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
                      "http://localhost:7000/AppartementForSale/" + value._id
                    );
                    console.log(response);
                    const newA_F_S = A_F_S.filter(
                      (a_F_S) => a_F_S._id != value._id
                    );
                    setA_F_S(newA_F_S);
                    setLaoding2(false);
                    toast.success("a_f_s deleted");
                  } catch (error) {
                    setLaoding2(false);
                    toast.error("a_f_sfailed to deleted");
                  }
                }}
              >
                dellet
              </button>
            </li>
          );
        })
      )}

      <ToastContainer />
    </div>
  );
}

export default Appartement_for_sale;