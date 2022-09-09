import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type ImageProperty = {
  url: string;
};

type DogProperty = {
  image: ImageProperty;
  name: string;
  temperament: string;
  description: string;
};

interface DogeInfo {
  goodBoys: Array<DogProperty>;
  isLoading: boolean;
}

const initialState: DogeInfo = {
  goodBoys: [],
  isLoading: false,
};

const dogeSlice = createSlice({
  name: "shiba_slice",
  initialState: initialState,
  reducers: {
    getDogFetch: (state: DogeInfo) => {
      state.isLoading = true;
    },
    getDogSuccess: (
      state: DogeInfo,
      action: PayloadAction<Required<Array<DogProperty>>>
    ) => {
      state.isLoading = false;
      state.goodBoys = action.payload;
    },
    getDogFailure: (state: DogeInfo) => {
      state.isLoading = false;
    },
  },
});

export const { getDogFetch, getDogSuccess, getDogFailure } = dogeSlice.actions;
export const shibaSelector = (store: RootState) => store.shibaReducer;
export default dogeSlice.reducer;
