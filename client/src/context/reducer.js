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
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Unesite sva navedena polja.",
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case TOGGLE_SIDEBAR: {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
      };
    }
    case UPDATE_USER_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "Korisnički profil je ažuriran!",
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case DELETE_USER_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Račun je uspješno izbrisan",
      };
    }
    case DELETE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: "pROBLEM U BRISANJUE",
      };
    }
    // * When an input change happens put the page back to 1
    case HANDLE_CHANGE: {
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };
    }
    case CLEAR_VALUES: {
      return {
        ...state,
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobLocation: state.userLocation,
        jobType: "full-time",
        status: "pending",
      };
    }
    case CREATE_JOB_BEGIN: {
      return { ...state, isLoading: true };
    }
    case CREATE_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Dodat novi posao",
      };
    }
    case CREATE_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case GET_JOBS_BEGIN: {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    }
    case GET_JOBS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allJobs: action.payload.pagedJobs,
        totalJobs: action.payload.totalNumOfJobs,
        numOfPages: action.payload.numOfPages,
      };
    }
    case DELETE_JOB_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SET_EDIT_JOB: {
      //* query the all jobs in the state for the specific job
      const jobToEdit = state.allJobs.find(
        (job) => job._id === action.payload.id
      );

      //* Get required job values
      const { _id, position, company, jobLocation, jobType, status } =
        jobToEdit;

      //* add the job id and the values to the state
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
    }
    case EDIT_JOB_BEGIN: {
      return { ...state, isLoading: true };
    }
    case EDIT_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Posao je ažuriran!",
      };
    }
    case EDIT_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case SHOW_STATS_BEGIN: {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    }
    case SHOW_STATS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      };
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        search: "",
        searchStatus: "svi",
        searchType: "svi",
        sort: "najnoviji",
      };
    }
    case CHANGE_PAGE: {
      return { ...state, page: action.payload.page };
    }
  }

  throw new Error(`No such option in reducer: ${action}`);
};

export default reducer;
