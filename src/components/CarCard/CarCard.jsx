import { useNavigate } from "react-router-dom";
import css from "./CarCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(car.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(car.id));
  };

  const navigate = useNavigate();

  const address = car.address;
  const parts = address.split(",").map((part) => part.trim());

  const city = parts[1] || "";
  const country = parts[2] || "";

  const handleClick = () => {
    navigate(`/catalog/${car.id}`);
  };

  return (
    <div className={css.carCard}>
      <div className={css.imageWrapper}>
        <img className={css.image} src={car.img} alt={car.brand} />
        <button
          onClick={handleToggleFavorite}
          className={css.favoriteButton}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            width="16"
            height="16"
            fill={isFavorite ? "var(--button)" : "none"}
            stroke={isFavorite ? "none" : "var(--main)"}
          >
            <use
              href={`/icons.svg#${
                isFavorite ? "icon-fill-heart" : "icon-heart"
              }`}
            />
          </svg>
        </button>
      </div>
      <div className={css.carData}>
        <div className={css.carName}>
          <span className={css.brand}>{car.brand} </span>
          <span className={css.model}>{car.model}</span>
          <span className={css.year}>, {car.year}</span>
        </div>
        <p className={css.rentalPrice}>${car.rentalPrice}</p>
      </div>
      <div>
        <div className={css.address}>
          <p className={css.parameter}>{city}</p>
          <svg className={css.line} width="12" height="16">
            <use href="/icons.svg#icon-line"></use>
          </svg>
          <p className={css.parameter}>{country}</p>
          <svg className={css.line} width="12" height="16">
            <use href="/icons.svg#icon-line"></use>
          </svg>
          <p className={css.parameter}>{car.rentalCompany}</p>
          <svg className={css.line} width="12" height="16">
            <use href="/icons.svg#icon-line"></use>
          </svg>
        </div>
        <div className={css.other}>
          <p className={css.parameter}>{car.type}</p>
          <svg className={css.line} width="12" height="16">
            <use href="/icons.svg#icon-line"></use>
          </svg>
          <p className={css.parameter}>{car.mileage}</p>
        </div>
      </div>
      <button onClick={handleClick} className={css.cardButton} type="button">
        Read more
      </button>
    </div>
  );
};

export default CarCard;
