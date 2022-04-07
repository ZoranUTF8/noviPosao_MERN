import { useAppContext } from "../context/appContext";
import StatsItem from "./StatsItem";
import { GrStatusInfo, GrStatusCritical, GrStatusGood } from "react-icons/gr";

import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  // * Get all stats from app context
  const { stats } = useAppContext();

  // * Display the totaly number of jobs statuses or display 0 if no jobs
  const defaultStats = [
    {
      title: "prijave na čekanju",
      count: stats.čekanje || 0,
      icon: <GrStatusInfo />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "zakazani intervjui",
      count: stats.intervju || 0,
      icon: <GrStatusGood />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "odbijeni",
      count: stats.odbijen || 0,
      icon: <GrStatusCritical />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
