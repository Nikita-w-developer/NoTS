import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "loading",
};

export const fetchPizzas = createAsyncThunk(
  "users/fetchPizzaStatus",
  async (params) => {
    const { sort, categoryId } = params;
    const { data } = await axios.get(
      `https://64f6dedc9d7754084952b2b8.mockapi.io/pizzas/?sortBy=${
        sort === "rating" ? sort.sortPropery + "&order=desc" : sort.sortPropery
      }&category=${categoryId === 0 ? "" : categoryId}`
    );
    return data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
