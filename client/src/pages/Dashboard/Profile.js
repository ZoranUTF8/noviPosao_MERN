import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  // get required global state values and functions
  const { user, showAlert, displayAlert, updateUser, isLoading, deleteUser } =
    useAppContext();

  // get values from user states
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastname, setLastName] = useState(user?.lastname);
  const [location, setLocation] = useState(user?.location);

  // form submit method
  const handleSubmit = (e) => {
    // prevent default page relaod
    e.preventDefault();

    //  check if any values missing
    if (!name || !email || !lastname || !location) {
      displayAlert();
      return;
    }

    //  if all values present than send new user profile object to update user in app context
    updateUser({ name, email, lastname, location });
  };
  //  from delete method
  // form submit method
  const handleDelete = (e) => {
    // prevent default page relaod
    e.preventDefault();

    deleteUser({ email });
  };

  // update local state values as they change
  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Moj profil</h3>

        {/* If alert true than show */}
        {showAlert && <Alert />}
        <div className="form-center">
          {/* name */}
          <FormRow
            type="text"
            name="Ime"
            value={name}
            handleChange={handleChange}
          />
          {/* last name */}
          <FormRow
            type="text"
            name="Prezime"
            value={lastname}
            handleChange={handleChange}
          />
          {/* email */}
          <FormRow
            type="email"
            name="Email"
            value={email}
            handleChange={handleChange}
          />
          {/* location */}
          <FormRow
            type="text"
            name="Lokacija"
            value={location}
            handleChange={handleChange}
          />
          {/* submit button */}
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Molim sačekajte..." : "Sačuvaj promjene"}
          </button>
          {/* delete profile button */}
          <button
            className="btn btn-block btn-delete"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Molim sačekajte..." : "Obriši račun"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
