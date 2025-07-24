import { Link, NavLink } from "react-router-dom";
import css from "./Header.module.css";
import Container from "../Container/Container";

const Header = () => {
  return (
    <div className={css.header}>
      <Container>
        <div className={css.headerNav}>
          <Link to="/">
            <svg className={css.logo} width="104" height="16">
              <use href="/icons.svg#icon-rental-car"></use>
            </svg>
          </Link>
          <div className={css.navigation}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? css.active : css.notActive
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/catalog"
              end
              className={({ isActive }) =>
                isActive ? css.active : css.notActive
              }
            >
              Catalog
            </NavLink>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Header;
