import React, { useId, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  addItemToCart,
  clearItem,
  removeAllItemById,
} from "../../redux/slice/cartReducer";

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
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => {
          mainPageDispatch({
            type: CounterEnum.INCREMENT,
            payload: 10,
          });
        }}
      >
        test btn
      </button>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => mainPageDispatch({ type: CounterEnum.TOGGLE })}
      >
        toggle
      </button>
      <p>{mainPageState.isClick && "Toggle Click"}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => dispatch(removeAllItemById(bookId))}
      >
        remove book
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => dispatch(removeAllItemById(magazineId))}
      >
        remove magazine
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => dispatch(clearItem())}
      >
        clear item
      </button>

      <nav className="relative container mx-auto p-6">
        <div className="flex items-center justify-between"></div>
      </nav>
    </div>
  );
}

export default MainPage;
