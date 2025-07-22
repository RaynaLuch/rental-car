import { Suspense } from "react";
import Header from "../Header/Header";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </div>
  );
};

export default Layout;
