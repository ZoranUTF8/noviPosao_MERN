import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  // * Fetch all stats on component renders
  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {/* IF WE HAVE JOBS THAN DISPLAY THE CHARTS */}
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
