import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  items: Product[];
}
const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // actions
    addToBasket: (state, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {},
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket.items;

export default basketSlice.reducer;
