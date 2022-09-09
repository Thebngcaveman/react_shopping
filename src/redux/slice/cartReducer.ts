import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface CartInfo {
  id: string;
  price: number;
  name: string;
  description: string;
}

const initialState: Array<CartInfo> = [];

const cartSlice = createSlice({
  name: "CART_SLICE",
  initialState: initialState,
  reducers: {
    addItemToCart: (
      state: Array<CartInfo>,
      action: PayloadAction<Required<CartInfo>>
    ) => {
      return [...state, action.payload];
    },
    clearItem: (state: Array<CartInfo>, action: PayloadAction<void>) => {
      return [];
    },
    removeAllItemById: (
      state: Array<CartInfo>,
      action: PayloadAction<Required<string>>
    ) => {
      return state.filter((value, key) => value.id !== action.payload);
    },
  },
});

export const { addItemToCart, clearItem, removeAllItemById } =
  cartSlice.actions;
export const cartSelector = (store: RootState) => store.cartReducer;
export default cartSlice.reducer;
