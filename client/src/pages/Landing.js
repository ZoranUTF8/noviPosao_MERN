import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Logo } from "../components";

import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
        {/* <Link to="/">Poslovi</Link>
        <Link to="/register">Registracija</Link>
        <Link to="/landing">Početna</Link> */}
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            aplikacija za <span>praćenje</span> poslova
          </h1>
          <p>Pratite status poslova za koje ste se prijavili</p>

          <Link to="/register" className="btn btn-hero">
            Prijavite se / Registrirajte se
          </Link>
          
        </div>
        <img src={main} alt="main img" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
