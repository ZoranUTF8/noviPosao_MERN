import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
//* global context import
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  //? Get global state values
  const { isLoading, showAlert, displayAlert, user, setupUser } =
    useAppContext();

  const navigate = useNavigate();

  //? Get the current user input values and check if he is registered, if not than register new user

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    //* prevent default page reload
    e.preventDefault();

    //* get user value
    const { name, email, password, isMember } = values;

    // * check if all values are present if not display alert
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    //* all values present than add to db
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser: currentUser,
        endPoint: "login",
        alertText: "Prijava je uspjela! Preusmjeravanje. . .",
      });
    } else {
      setupUser({
        currentUser: currentUser,
        endPoint: "register",
        alertText: "Korisnik uspješno kreiran! Preusmjeravanje. . .",
      });
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  //? If user true than redirect to homepage
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        {/* If show alert true show alert */}
        {showAlert && <Alert />}
        <h3>{values.isMember ? "Prijavite se" : "Registrujte se"}</h3>

        {/*  if not member add name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="Korisničko Ime"
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="email"
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Lozinka"
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>

        {/* check if registered already */}
        {values.isMember ? "Još uvijek niste član? " : "Već ste član?"}
        <button type="button" onClick={toggleMember} className="member-btn">
          {values.isMember ? "Registrujte se" : "Prijavite se"}
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
