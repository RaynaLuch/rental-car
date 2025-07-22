export const getCarsByPage = async (page = 1) => {
  const res = await fetch(
    `https://car-rental-api.goit.global/cars?page=${page}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }
  return await res.json(); // { cars, page, totalPages }
};
