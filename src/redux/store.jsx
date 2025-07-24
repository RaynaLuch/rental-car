import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import carsReducer from "./carsSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cars: carsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
