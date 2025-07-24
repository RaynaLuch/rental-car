import { useEffect, useState } from "react";
import { getCarsByPage } from "../../services/carApi.jsx";
import CarCard from "../CarCard/CarCard.jsx";
import css from "./CarList.module.css";
import { useSelector } from "react-redux";

const CarList = () => {
  const filters = useSelector((state) => state.filters);
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCars = async (pageToLoad) => {
    setLoading(true);
    try {
      const data = await getCarsByPage(pageToLoad, filters);
      setCars((prev) => {
        const newCars = data.cars.filter(
          (car) => !prev.some((existing) => existing.id === car.id)
        );
        return [...prev, ...newCars];
      });
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCars([]);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    fetchCars(page);
  }, [page, filters]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className={css.carList}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      {loading && <p>Loading...</p>}

      {!loading && page < totalPages && (
        <button onClick={handleLoadMore} className={css.loadMoreButton}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CarList;
