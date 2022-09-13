export enum CounterEnum {
  INCREMENT_BY_ONE = "INCREMENT_BY_ONE",
  DECREMENT_BY_ONE = "DECREMENT_BY_ONE",
  INCREMENT = "INCREMENT",
  TOGGLE = "TOGGLE",
}

export interface CountAction {
  type: CounterEnum;
  payload: number;
}

export interface CountState {
  count: number;
  isClick: boolean;
}
