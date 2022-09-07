import React, { useId, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, addItemToCart, clearItem } from "../slice/cartReducer";

enum CounterEnum {
  INCREMENT_BY_ONE = "INCREMENT_BY_ONE",
  DECREMENT_BY_ONE = "DECREMENT_BY_ONE",
  INCREMENT = "INCREMENT",
  TOGGLE = "TOGGLE",
}

interface CountAction {
  type: CounterEnum;
  payload: number;
}

interface CountState {
  count: number;
  isClick: boolean;
}

const reducer = (state: CountState, action: Partial<CountAction>) => {
  const { type } = action;
  switch (type) {
    case CounterEnum.INCREMENT_BY_ONE:
      return {
        ...state,
        count: state.count + 1,
      };
    case CounterEnum.DECREMENT_BY_ONE:
      return {
        ...state,
        count: state.count - 1,
      };
    case CounterEnum.INCREMENT:
      const payloadCount: any = action.payload && action.payload;
      return {
        ...state,
        count: state.count + payloadCount,
      };
    case CounterEnum.TOGGLE:
      return {
        ...state,
        isClick: !state.isClick,
      };
    default:
      return state;
  }
};

const initialState: CountState = {
  count: 0,
  isClick: false,
};

function MainPage() {
  const dispatch = useDispatch();
  const [mainPageState, mainPageDispatch] = useReducer(reducer, initialState);
  const selectProduct = useSelector(cartSelector);
  const magazineId = useId();
  const bookId = useId();

  const calculatePrice = () => {
    return selectProduct.reduce(
      (accumulator, item) => accumulator + item.price,
      0
    );
  };

  return (
    <div>
      <p>{mainPageState.count}</p>
      <p>price {calculatePrice()}</p>
      <button
        onClick={() => {
          mainPageDispatch({
            type: CounterEnum.INCREMENT,
            payload: 10,
          });
        }}
      >
        test btn
      </button>
      <button onClick={() => mainPageDispatch({ type: CounterEnum.TOGGLE })}>
        toggle
      </button>
      <p>{mainPageState.isClick && "Toggle Click"}</p>
      <button
        onClick={() =>
          dispatch(
            addItemToCart({
              description: "Click here to see what lies beneath",
              id: magazineId,
              name: "Play boy magazine",
              price: 2,
            })
          )
        }
      >
        add magazine
      </button>
      <button
        onClick={() =>
          dispatch(
            addItemToCart({
              description: "how to play valorant like Bronze KEKW",
              id: bookId,
              name: "valorant guide",
              price: 222,
            })
          )
        }
      >
        add book
      </button>
      <button onClick={() => dispatch(clearItem())}>clear item</button>
      {selectProduct.map((value, key) => {
        return (
          <div key={key}>
            <p>{value.name}</p>
            <p>{value.description}</p>
            <p>{value.price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;
