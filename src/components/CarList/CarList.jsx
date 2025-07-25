import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars, incrementPage, resetCars } from "../../redux/carsSlice";
import CarCard from "../CarCard/CarCard.jsx";
import css from "./CarList.module.css";
import Loader from "../Loader/Loader";

const CarList = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const { cars, page, totalPages, loading, error } = useSelector(
    (state) => state.cars
  );

  useEffect(() => {
    dispatch(resetCars());
    dispatch(fetchCars({ page: 1, filters }));
  }, [filters, dispatch]);

  useEffect(() => {
    if (page !== 1) {
      dispatch(fetchCars({ page, filters }));
    }
  }, [page, filters, dispatch]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <div>
      {loading && (
        <div className={css.loaderOverlay}>
          <Loader />
        </div>
      )}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className={css.carList}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {!loading && page < totalPages && (
        <button onClick={handleLoadMore} className={css.loadMoreButton}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CarList;
