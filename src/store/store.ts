import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartReducer from "../slice/cartReducer";
import createSagaMiddleware from "redux-saga";
import shibaReducer from "../slice/shibaReducer";
import dogSaga from "../saga/dogSaga";

const saga = createSagaMiddleware();

const reducers = {
  cartReducer,
  shibaReducer,
};

// function logger({ getState }: any) {
//   return (next: any) => (action: any) => {
//     // console.log("will dispatch", action);
//     // const returnValue = next(action);
//     // console.log("state after dispatch", getState());
//     // return returnValue;
//   };
// }

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(dogSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
