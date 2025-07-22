import { useNavigate } from "react-router-dom";
import css from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <div className={css.heroImage}>
      <h1 className={css.heroTitle}>Find your perfect rental car</h1>
      <p className={css.heroText}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <div className={css.heroPadding}>
        <button onClick={handleClick} className={css.heroButton} type="button">
          View Catalog
        </button>
      </div>
    </div>
  );
};

export default Hero;
