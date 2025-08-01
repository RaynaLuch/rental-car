import React from "react";
import css from "./Loader.module.css";

const Loader = () => (
  <div className={css.loaderContainer}>
    <div className={css.spinner}></div>
  </div>
);

export default Loader;
