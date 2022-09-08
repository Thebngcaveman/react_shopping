import { call, put, takeEvery } from "redux-saga/effects";
import { getDogSuccess } from "../slice/shibaReducer";

function* workGetDogsFetch(): any {
  const dogs = yield call(() => fetch("https://api.thedogapi.com/v1/breeds"));
  const formattedDogs = yield dogs.json();
  const formattedDogsShortened = formattedDogs
    .filter((value: any) => value.name === "Shiba Inu")
    .concat(formattedDogs.slice(0, 10));
  yield put(getDogSuccess(formattedDogsShortened));
}

function* dogSaga() {
  yield takeEvery("shiba_slice/getDogFetch", workGetDogsFetch);
}

export default dogSaga;
