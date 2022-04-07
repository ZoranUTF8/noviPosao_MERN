import React, {
  useState,
  useReducer,
  useContext,
  useEffect,
  createContext,
} from "react";
import reducer from "./reducer";
import axios from "axios";

//* actions import
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";

//* get user from local storage if exist
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

//* declare starting state
export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  //* User state
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  //* Navbar
  showSidebar: false,
  // * Job state
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  // jobLocation
  jobTypeOptions: ["puno", "skraćeno", "daljinski", "pripravnički"],
  jobType: "puno-vrijeme",
  statusOptions: ["intervju", "odbijen", "čekanje"],
  status: "čekanje",
  //* All jobs state
  allJobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  // * Stats initial state
  stats: {},
  monthlyApplications: [],
  // * Search state
  search: "",
  searchStatus: "svi",
  searchType: "svi",
  sort: "najnoviji",
  sortOptions: ["najnoviji", "najstariji", "a-z", "z-a"],
};

//* Create app context
const AppContext = createContext();

const AppProvider = ({ children }) => {
  //*   connect reducer to the initial state to manage the state values
  const [state, dispatch] = useReducer(reducer, initialState);

  //* SET UP AXIOS MIDDLEWARE  FOR SENDING THE AUTH HEADER TOKEN
  const authFetchRequest = axios.create({
    baseURL: "/api/v1",
  });

  //* AXIOS REQUEST
  authFetchRequest.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //* AXIOS RESPONSE
  authFetchRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("====================================");
      console.log(error.responses);
      console.log("====================================");

      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //* STATE MANIPULATION METHODS AND REDUCER DISPATCH
  //? DISPLAY ALERT
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  //? CLEAR ALERT
  const clearAlert = () => {
    //? call clear alrt after 3 seconds
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  //? ADD USER TO LOCAL STORAGE
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  //? REMOVE USER FROM LOCAL STORAGE
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  //? REGISTER / LOGIN USER
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      //* Send user values to the apropriate api path
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      //* take user data from response
      const { user, token, location } = data;

      //* send user data to the reducer to update the state
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      //* add user data to local storage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    //* clear alert
    clearAlert();
  };

  //? TOOGLE SIDEBAR
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  //? LOGOUT USER FROM NAVBAR BTN
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  //? UPDATE USER PROFILE
  const updateUser = async (updatedUserValues) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      // ? Send the updated user values to the server with the authorisation token from the current user in the request header
      const { data } = await authFetchRequest.patch(
        "/auth/updateUser",
        updatedUserValues
      );

      //* Get the updated user data from the server
      const { user, location, token } = data;

      //* Send new user values to the reducer to update the state
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      //* Asdd updated user values to the local storage
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401 && error.response.status !== 500) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    //* clear alert after all actions completed
    clearAlert();
  };

  //? Handle form change dynamically

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  //? Clear form values
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  //? ADD NEW JOB
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try {
      //* get the values from the current state
      const { position, company, jobLocation, jobType, status } = state;

      //* send the data to the server
      const res = await authFetchRequest.post("/jobs", {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      console.log(res);

      dispatch({ type: CREATE_JOB_SUCCESS });

      //* call function instead clearValues()
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //? Get all jobs
  const getAllJobs = async () => {
    // * Get user search/filter values

    const { search, searchStatus, searchType, sort, page } = state;

    // * Construct the url from the search/filter values
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    // * Add the custom name search if provided
    if (search) url = url + `&search=${search}`;

    dispatch({ type: GET_JOBS_BEGIN });

    try {
      //* get all jobs from the server
      const { data } = await authFetchRequest.get(url);

      //* take the recived data from the request
      const { pagedJobs, totalNumOfJobs, numOfPages } = data;

      //* dispatch the action to update the value in the state
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          pagedJobs,
          totalNumOfJobs,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };

  //? Edit job
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      //* Get job values from the state that we set with the set edit job
      const { position, company, jobLocation, jobType, status } = state;

      // * Send tHe job data to the server
      await authFetchRequest.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });

      dispatch({
        type: EDIT_JOB_SUCCESS,
      });

      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: EDIT_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  //? Delete job
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });

    try {
      console.log("Deletes frontend");
      // * Send delete request to server
      await authFetchRequest.delete(`/jobs/${jobId}`);

      // * Refresh all jobs
      getAllJobs();
    } catch (error) {
      // * If error than logout user
      console.log(error);
      logoutUser();
    }
  };

  // ? Show stats
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });

    try {
      // * Get stats data from the server
      const { data } = await authFetchRequest("/jobs/stats");

      //* Send the stats data to the reducer to add to state
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      console.log("====================================");
      console.log(error.response);
      console.log("====================================");
      logoutUser();
    }

    clearAlert();
  };

  // ? Clear Filters
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  // ? Change page
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  //? DELETE USER PROFILE
  const deleteUser = async (userEmail) => {
    // dispatch({ type: UPDATE_USER_BEGIN });
    // try {
    //   // ? Send the updated user values to the server with the authorisation token from the current user in the request header
    //   const { data } = await authFetchRequest.patch(
    //     "/auth/updateUser",
    //     updatedUserValues
    //   );

    //   //* Get the updated user data from the server
    //   const { user, location, token } = data;

    //   //* Send new user values to the reducer to update the state
    //   dispatch({
    //     type: UPDATE_USER_SUCCESS,
    //     payload: { user, location, token },
    //   });

    //   //* Asdd updated user values to the local storage
    //   addUserToLocalStorage({ user, location, token });
    // } catch (error) {
    //   if (error.response.status !== 401 && error.response.status !== 500) {
    //     dispatch({
    //       type: UPDATE_USER_ERROR,
    //       payload: { msg: error.response.data.msg },
    //     });
    //   }
    // }
    // //* clear alert after all actions completed
    // clearAlert();

    console.log(userEmail);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getAllJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        deleteUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
