import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCarsByPage } from "../services/carApi.jsx";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ page, filters }, thunkAPI) => {
    try {
      const response = await getCarsByPage(page, filters);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    totalPages: null,
    loading: false,
    error: null,
    page: 1,
  },
  reducers: {
    resetCars(state) {
      state.cars = [];
      state.totalPages = null;
      state.page = 1;
      state.error = null;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        const newCars = action.payload.cars.filter(
          (car) => !state.cars.some((c) => c.id === car.id)
        );
        state.cars = [...state.cars, ...newCars];
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cars";
      });
  },
});

export const { resetCars, incrementPage } = carsSlice.actions;
export default carsSlice.reducer;
