import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import Container from "../Container/Container";

const Header = () => {
  return (
    <div className={css.header}>
      <Container>
        <div className={css.headerNav}>
          <svg className={css.logo} width="104" height="16">
            <use href="/icons.svg#icon-rental-car"></use>
          </svg>
          <div className={css.navigation}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? css.active : css.notActive
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
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
