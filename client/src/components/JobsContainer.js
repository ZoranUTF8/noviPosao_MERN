import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  // * Get values from global state
  const {
    getAllJobs,
    allJobs,
    isLoading,
    page,
    numOfPages,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  // * Get all jobs whenever the search query changes
  useEffect(() => {
    getAllJobs();
  }, [search, searchStatus, searchType, sort, page]);

  // * If fetching jobs that display loading spinner
  if (isLoading) {
    return <Loading center />;
  }

  //   * id no jobs than display no jobs
  if (allJobs.length === 0) {
    return (
      <Wrapper>
        <h2>Nema poslova za prikaz...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} {allJobs.length > 1 ? "poslova nadjeno." : "posao nadjen"}
      </h5>
      <div className="jobs">
        {allJobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
