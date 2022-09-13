import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogFetch, shibaSelector } from "../../redux/slice/shibaReducer";
import "./DogScreen.css";

export default function DogScreen() {
  const dogsSelector = useSelector(shibaSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogFetch());
    return () => {};
  }, [dispatch]);

  return (
    <div className="Gallery">
      {dogsSelector.goodBoys.map((dog, key) => {
        return (
          <div key={key} className="row">
            <div className="column column-left">
              <img
                alt={dog.name}
                src={dog.image.url}
                width="200"
                height="200"
              />
            </div>
            <div className="column column-right">
              <h2>{dog.name}</h2>
              <h5>{dog.temperament}</h5>
              <p>{dog.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
