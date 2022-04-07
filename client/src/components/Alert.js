import { useAppContext } from "../context/appContext";

const Alert = () => {
  //* get alert type from global state
  const { alertType, alertText } = useAppContext();

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
