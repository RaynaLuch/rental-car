import axios from "axios";

const BASE_URL = "https://car-rental-api.goit.global/cars";

export const getCarsByPage = async (page = 1) => {
  try {
    const { data } = await axios.get(`${BASE_URL}?page=${page}`);
    return data; // очікується об'єкт з cars, totalPages тощо
  } catch (error) {
    throw new Error("Failed to fetch cars: " + error?.message);
  }
};

export const getCarById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    return data; // очікується об'єкт з даними про авто
  } catch (error) {
    throw new Error("Failed to fetch car data: " + error?.message);
  }
};
