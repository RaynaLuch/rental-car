import axios from "axios";

const BASE_URL = "https://car-rental-api.goit.global";

export const getCarsByPage = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({ page });

  if (filters.brand) params.append("brand", filters.brand);
  if (filters.rentalPrice) params.append("rentalPrice", filters.rentalPrice);
  if (filters.mileageMin !== undefined && filters.mileageMin !== "")
    params.append("minMileage", filters.mileageMin);
  if (filters.mileageMax !== undefined && filters.mileageMax !== "")
    params.append("maxMileage", filters.mileageMax);

  const res = await fetch(`${BASE_URL}/cars?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }

  return await res.json();
};

export const getCarById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cars/${id}`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch car data: " + error?.message);
  }
};

export const getBrands = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/brands`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch brands: " + error?.message);
  }
};
