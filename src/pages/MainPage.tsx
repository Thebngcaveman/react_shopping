import React, { useReducer } from "react";

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

const initialState = {
  count: 0,
  isClick: false,
};

function TestUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <p>{state.count}</p>

      <button
        onClick={() => {
          dispatch({
            type: CounterEnum.INCREMENT_BY_PAYLOAD,
            payload: 10,
          });
        }}
      >
        test btn
      </button>

      <button onClick={() => dispatch({ type: CounterEnum.TOGGLE })}>
        toggle
      </button>

      <p>{state.isClick && "Toggle Click"}</p>
    </div>
  );
}

export default TestUseReducer;
