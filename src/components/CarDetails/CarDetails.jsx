import css from "./CarDetails.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarById } from "../../services/carApi";
import BookingForm from "../BookingForm/BookingForm.jsx";
import Loader from "../Loader/Loader.jsx";

const formatMileage = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCarById(id)
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load car details");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className={css.loaderOverlay}>
        <Loader />
      </div>
    );

  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  if (!car) return null;

  const address = car.address || "";
  const parts = address.split(",").map((part) => part.trim());

  const city = parts[1] || "";
  const country = parts[2] || "";

  return (
    <div className={css.carDetails}>
      <div className={css.order}>
        <img className={css.image} src={car.img} alt={car.brand} />
        <BookingForm />
      </div>
      <div>
        <div className={css.carName}>
          <h2 className={css.brand}>
            {car.brand} {car.model}, {car.year}
          </h2>
          <p className={css.id}>id {car.id}</p>
        </div>
        <div className={css.address}>
          <svg className={css.locationIcon} width="12" height="15">
            <use href="/icons.svg#icon-location"></use>
          </svg>
          <p className={css.location}>
            {city}, {country}
          </p>
          <p>Mileage: {formatMileage(car.mileage)} km</p>
        </div>
        <p className={css.rentalPrice}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
        <div>
          <h3 className={css.title}>Rental Conditions:</h3>
          <ul className={css.conditions}>
            {car.rentalConditions.map((condition, index) => (
              <li className={css.condition} key={index}>
                <svg className={css.checkIcon} width="16" height="16">
                  <use href="/icons.svg#icon-check-circle"></use>
                </svg>
                {condition}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={css.title}>Car Specifications:</h3>
          <ul className={css.conditions}>
            <li className={css.condition}>
              <svg className={css.checkIcon} width="16" height="16">
                <use href="/icons.svg#icon-calendar"></use>
              </svg>
              Year: {car.year}
            </li>
            <li className={css.condition}>
              <svg className={css.checkIcon} width="16" height="16">
                <use href="/icons.svg#icon-car"></use>
              </svg>
              Type: {car.type}
            </li>
            <li className={css.condition}>
              <svg className={css.checkIcon} width="16" height="16">
                <use href="/icons.svg#icon-fuel-pump"></use>
              </svg>
              Fuel Consumption: {car.fuelConsumption}
            </li>
            <li className={css.condition}>
              <svg className={css.checkIcon} width="16" height="16">
                <use href="/icons.svg#icon-gear"></use>
              </svg>
              Engine Size: {car.engineSize}
            </li>
          </ul>
        </div>
        <div>
          <h3 className={css.title}>Accessories and functionalities:</h3>
          <ul className={css.conditions}>
            {car.accessories.map((accessory, index) => (
              <li className={css.condition} key={index}>
                <svg className={css.checkIcon} width="16" height="16">
                  <use href="/icons.svg#icon-check-circle"></use>
                </svg>
                {accessory}
              </li>
            ))}
            {car.functionalities.map((functionality, index) => (
              <li className={css.condition} key={index}>
                <svg className={css.checkIcon} width="16" height="16">
                  <use href="/icons.svg#icon-check-circle"></use>
                </svg>
                {functionality}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
