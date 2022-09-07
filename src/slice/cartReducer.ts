import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface CartInfo {
  id: number;
  price: number;
  name: string;
  description: string;
}

const initialState: CartInfo = {
  id: 0,
  price: 0,
  name: "emp",
  description: "emp",
};

const cartSlice = createSlice({
  name: "CART_SLICE",
  initialState: initialState,
  reducers: {
    currentItemSelected: (
      state: CartInfo,
      action: PayloadAction<Required<CartInfo>>
    ) => {
      state.description = action.payload.description;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.price = action.payload.price;
    },
  },
});

export const { currentItemSelected } = cartSlice.actions;
export const cartSelector = (store: RootState) => store.cartReducer;
export default cartSlice.reducer;
