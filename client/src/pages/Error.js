import { Link } from "react-router-dom";
import img from "../assets/images/errorPage.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found image" />
        <h3>Ohh... stranica nije pronađena.</h3>
        <p>Ne možemo pronaći stranicu koju tražite.</p>
        <Link to="/">Nazad na početnu</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
