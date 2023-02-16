import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductList {
  products: Product[];
  isLoading: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

interface Counter {
  count: number;
  test: ProductList;
}

const initialState: Counter = {
  count: 0,
  test: {
    isLoading: false,
    products: [],
    loading: "idle",
  },
};

// First, create the thunk
export const getProducts = createAsyncThunk(
  "counter/fetchProducts",
  async (_: number, thunkAPI) => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      const { payload } = action;
      state.count++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.test.loading = "pending";
      state.test.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      // Add user to the state array
      state.test.loading = "succeeded";
      state.test.isLoading = false;
      state.test.products = action.payload.products;
      console.log("hello: ", action.payload.products);
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      // Add user to the state array
      state.test.loading = "failed";
      state.test.isLoading = false;
    });
  },
});

export default counterSlice.reducer;
