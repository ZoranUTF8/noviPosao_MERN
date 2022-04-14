import { useState } from "react";
//* React icons
import { FaUserAlt, FaCaretDown } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { ImExit } from "react-icons/im";

import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import Clock from "./Clock";
import Wrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
  //* get user from global state
  const { user, logoutUser, toggleSidebar } = useAppContext();
  //* state for toggling logout
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <AiOutlineMenu />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">
            Kontrolna tabla
            <span>
              <Clock />
            </span>
          </h3>
        </div>

        <div className="btn-container">
          <button className="btn" onClick={() => setShowLogout(!showLogout)}>
            <FaUserAlt />
            {user?.name}
            <FaCaretDown />
          </button>

          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button onClick={logoutUser} className=" dropdown-btn">
              <ImExit />
              Odjavi se
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
