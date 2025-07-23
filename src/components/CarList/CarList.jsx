import { useEffect, useState } from "react";
import { getCarsByPage } from "../../services/carApi.jsx";
import CarCard from "../CarCard/CarCard.jsx";
import css from "./CarList.module.css";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  // завантажує першу сторінку або наступну
  const fetchCars = async (pageToLoad) => {
    setLoading(true);
    try {
      const data = await getCarsByPage(pageToLoad);
      setCars((prev) => [...prev, ...data.cars]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(page);
  }, [page]);

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
