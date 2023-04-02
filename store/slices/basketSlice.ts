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
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((x) => x.id === action.payload.id);
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket.items;

export default basketSlice.reducer;
