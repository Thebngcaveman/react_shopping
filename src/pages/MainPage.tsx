import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, currentItemSelected } from "../slice/cartReducer";

enum CounterEnum {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  INCREMENT_BY_PAYLOAD = "INCREMENT_BY_PAYLOAD",
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
    case CounterEnum.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case CounterEnum.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case CounterEnum.INCREMENT_BY_PAYLOAD:
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
  return (
    <div>
      <p>{mainPageState.count}</p>
      <button
        onClick={() => {
          mainPageDispatch({
            type: CounterEnum.INCREMENT_BY_PAYLOAD,
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
            currentItemSelected({
              description: "Click here to see what lies beneath",
              id: 2,
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
            currentItemSelected({
              description: "how to play valorant like Bronze KEKW",
              id: 1,
              name: "valorant guide",
              price: 222,
            })
          )
        }
      >
        add book
      </button>
      <p>{"id ====>" + selectProduct.id}</p>
      <p>{"name ====>" + selectProduct.name}</p>
      <p>{"description ====>" + selectProduct.description}</p>
      <p>{"price ====>" + selectProduct.price}</p>
    </div>
  );
}

export default MainPage;
