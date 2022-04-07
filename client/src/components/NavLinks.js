import { NavLink } from "react-router-dom";
import Links from "../utils/Links";
import { useAppContext } from "../context/appContext";


//* Component to render link in the small/big sidebar

const NavLinks = () => {

    const { toggleSidebar } = useAppContext();

    return (
        <div className="nav-links">
          {Links.map((link) => {
            const { text, path, id, icon } = link;
    
            return (
              <NavLink
                to={path}
                key={id}
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            );
          })}
        </div>
      );
}

export default NavLinks