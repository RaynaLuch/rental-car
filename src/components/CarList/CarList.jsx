import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars, incrementPage, resetCars } from "../../redux/carsSlice";
import CarCard from "../CarCard/CarCard.jsx";
import css from "./CarList.module.css";

const CarList = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const { cars, page, totalPages, loading, error } = useSelector(
    (state) => state.cars
  );

  useEffect(() => {
    dispatch(resetCars());
  }, [filters, dispatch]);

  useEffect(() => {
    dispatch(fetchCars({ page, filters }));
  }, [page, filters, dispatch]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <div>
      <div className={css.carList}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && page < totalPages && (
        <button onClick={handleLoadMore} className={css.loadMoreButton}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CarList;
