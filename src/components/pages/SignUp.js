import React, { useEffect, useState } from "react";
import registerstyle from "./Register.module.css";
import axios from "axios";

import Swal from "sweetalert2";

const SignUp = ({ axiosClient }) => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      error.name = "Name is required";
    }

    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {
    //   setIsSubmit(true);
    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      const data = {
        name: user.name,
        email: user.email,
        password: user.password,
      };
      axiosClient.current
        .post("/signup", data, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          // backend db url
          Swal.fire({ text: res.data.message, icon: "success" });
        });
    }
  }, [formErrors]);

  return (
    <>
      <div className={registerstyle.container}>
        <div className={registerstyle.register}>
          <form>
            <h1 style={{ marginBottom: "5px" }}>Create your account</h1>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={changeHandler}
              value={user.name}
            />
            <p className={registerstyle.error}>{formErrors.lname}</p>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={changeHandler}
              value={user.email}
            />

            <p className={registerstyle.error}>{formErrors.email}</p>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={changeHandler}
              value={user.password}
            />
            <p className={registerstyle.error}>{formErrors.password}</p>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={user.cpassword}
            />
            <p className={registerstyle.error}>{formErrors.cpassword}</p>
            <button
              className={registerstyle.button_common}
              onClick={signupHandler}
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
