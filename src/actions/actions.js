import {
  NUMBER,
  DECIMAL,
  ADD_OR_SUBTRACT,
  MULTIPLY_OR_DIVIDE,
  EQUALS,
  CLEAR,
  NEGATE,
  PERCENT
} from "./actionTypes";

export const numberClicked = (content) => ({
  type: NUMBER,
  payload: {
    input: content,
    operation: "number"
  }
});

export const decimalClicked = (content) => ({
  type: DECIMAL,
  payload: {
    input: content,
    operation: "decimal"
  }
});

export const addOrSubtractClicked = (content) => ({
  type: ADD_OR_SUBTRACT,
  payload: {
    input: content,
    operation: "operator"
  }
});

export const multiplyOrDivideClicked = (content) => ({
  type: MULTIPLY_OR_DIVIDE,
  payload: {
    input: content,
    operation: "operator"
  }
});

export const equalsClicked = (content) => ({
  type: EQUALS,
  payload: {
    input: content,
    operation: "equals"
  }
});

export const clearClicked = () => ({
  type: CLEAR,
  payload: {
    operation: "clear"
  }
});

export const negateClicked = () => ({
  type: NEGATE,
  payload: {
    operation: "negate"
  }
});

export const percentClicked = () => ({
  type: PERCENT,
  payload: {
    operation: "percent"
  }
});
