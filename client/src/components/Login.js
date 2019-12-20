import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ### Stage 1 - Authentication

// Build a login form to authenticate your users.

// - [ ] Construct an AXIOS request to retrieve a token from the server. You'll use this token to interact with the API
// - [ ] Save the token to localStorage

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();

  function login(user, resetForm) {
    axios
      .post("http://localhost:5000/api/login", user)
      .then(({ data }) => {
        window.localStorage.setItem("token", data.payload);
        resetForm();
        history.push("/bubble");
      })
      .catch(err => {
        resetForm();
      });
  }

  function guest() {
    axios
      .post("http://localhost:5000/api/login", {
        username: "Lambda School",
        password: "i<3Lambd4"
      })
      .then(({ data }) => {
        window.localStorage.setItem("token", data.payload);
        history.push("/bubble");
      });
  }

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required")
        })}
        onSubmit={(values, { resetForm }) => {
          login(values, resetForm);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="username">Username: </label>
            <Field
              id="username"
              type="text"
              name="username"
              placeholder="type username"
            />
            <ErrorMessage name="username" className="error" component="div" />
            <label htmlFor="password">password: </label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="type password"
              autoComplete="off"
            />
            <ErrorMessage name="password" className="error" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <button type="button" onClick={guest} disabled={isSubmitting}>
              GuestMode
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
