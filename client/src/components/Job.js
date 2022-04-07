import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { GrStatusInfo, GrStatusCritical, GrStatusGood } from "react-icons/gr";

import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
//* Moment.js setup
import moment from "moment";
import "moment/locale/bs";

const Job = ({
  _id,
  position,
  company,
  createdAt,
  jobLocation,
  jobType,
  status,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  //* Format date
  let date = moment(createdAt).format("LL");

  // * Call edit job with the jobs id
  const editJob = (_id) => {
    setEditJob(_id);
  };

  // * Call delete job with the jobs id
  const deleteCurrentJob = (_id) => {
    deleteJob(_id);
  };

  const checkStatus = (status) => {
    switch (status) {
      case "intervju":
        return <GrStatusGood />;

      case "odbijen":
        return <GrStatusCritical />;

      case "čekanje":
        return <GrStatusInfo />;

      default:
        console.log("No such option for status");
        return;
    }
  };

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>
            <span>
              {checkStatus(status)}
              {status}
            </span>
          </div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              onClick={() => editJob(_id)}
              className="btn edit-btn"
            >
              Uredi
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteCurrentJob(_id)}
            >
              Izbriši
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
