import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { getDogSuccess } from "../slice/shibaReducer";

function* workGetDogsFetch(): any {
  const controller = new AbortController();
  const dogs = yield call(() =>
    axios
      .get("https://api.thedogapi.com/v1/breeds", { signal: controller.signal })
      .then((value) => {
        return value;
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          controller.abort();
        } else {
          // TODO: handle error
        }
      })
  );
  const formattedDogs = yield JSON.parse(JSON.stringify(dogs.data));
  const formattedDogsShortened = formattedDogs
    .filter((value: any) => value.name === "Shiba Inu")
    .concat(formattedDogs.slice(0, 10));
  yield put(getDogSuccess(formattedDogsShortened));
}

function* dogSaga() {
  yield takeEvery("shiba_slice/getDogFetch", workGetDogsFetch);
}

export default dogSaga;
