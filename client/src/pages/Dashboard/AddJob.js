import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  //? Handle form submission
  const handleSubmit = (e) => {
    // * Prevent page reload default
    e.preventDefault();

    //* if values missing that display alert
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    // * If is editing is true than edit job instead of create
    if (isEditing) {
      editJob();
      return;
    }

    createJob();
  };

  //* Handle form row change and add to state
  const handleJobInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  //* Clear form values
  const clearFormValues = () => {
    clearValues();
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Ažuriranje" : "Dodajte posao"} </h3>
        {showAlert && <Alert />}

        {/* position */}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            labelText="Pozicija"
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            labelText="Kompanija"
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type="text"
            labelText="Lokacija posla"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job type */}
          <FormRowSelect
            name="jobType"
            value={jobType}
            labelText="Tip posla"
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Potvrdi unos
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={clearFormValues}
            >
              Obriši unos
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
