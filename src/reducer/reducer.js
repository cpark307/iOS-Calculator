import * as mathjs from "mathjs";

import {
  NUMBER,
  DECIMAL,
  EQUALS,
  CLEAR,
  NEGATE,
  PERCENT,
  MULTIPLY_OR_DIVIDE,
  ADD_OR_SUBTRACT
} from "../actions/actionTypes";

import { formatDisplay } from "../utils/util";

const initialState = {
  display: "0",
  operands: ["", "", ""],
  operators: ["", ""],
  prevAction1: "",
  prevAction2: ""
};

export default function (state = initialState, action) {
  const operandIndex = state.operands.findIndex((operand) => operand === "");
  const operatorIndex = state.operators.findIndex(
    (operator) => operator === ""
  );
  let lastOperatorIndex = state.operators.findLastIndex(
    (operator) => operator !== ""
  );
  let lastOperandIndex = state.operands.findLastIndex(
    (operand) => operand !== ""
  );
  let tempOperators = state.operators.slice();
  let tempOperands = state.operands.slice();

  switch (action.type) {
    case NUMBER: {
      const num = action.payload;

      if (state.prevAction1 === "equals") {
        let indexToUpdate = state.operators[0] !== "" ? 1 : 0;
        tempOperands[indexToUpdate] = num.input;
        return {
          ...state,
          display: formatDisplay(parseFloat(num.input)),
          operands: tempOperands,
          prevAction1: num.operation,
          prevAction2: state.prevAction1
        };
      } else if (
        state.prevAction1 === "number" &&
        state.prevAction2 === "equals"
      ) {
        let indexToUpdate =
          lastOperandIndex === 0 ? 0 : lastOperandIndex === 1 ? 1 : 2;
        tempOperands[indexToUpdate] = tempOperands[indexToUpdate] + num.input;
        return {
          ...state,
          display: formatDisplay(parseFloat(tempOperands[indexToUpdate])),
          operands: tempOperands
        };
      } else if (
        state.prevAction1 === "operator" ||
        state.prevAction1 === "" ||
        state.prevAction1 === "clear" ||
        (state.prevAction1 !== "operator" && state.display === "0")
      ) {
        let indexToUpdate =
          lastOperandIndex === -1 ? 0 : lastOperandIndex === 0 ? 1 : 2;
        tempOperands[indexToUpdate] = num.input;
        return {
          ...state,
          display: formatDisplay(parseFloat(num.input)),
          operands: tempOperands,
          prevAction1: num.operation,
          prevAction2: state.prevAction1
        };
      } else if (state.prevAction1 === "negate") {
        if (lastOperandIndex === 0) {
          if (state.display === "-0") {
            tempOperands[0] = mathjs.evaluate("-1 *" + num.input);
            return {
              ...state,
              display: formatDisplay(parseFloat(tempOperands[0])),
              operands: tempOperands,
              prevAction1: num.operation,
              prevAction2: state.prevAction1
            };
          }
          tempOperands[0] = state.display.startsWith("-")
            ? "-" + state.operands[0].substring(1) + num.input
            : state.operands[1] + num.input;
          return {
            ...state,
            display: formatDisplay(parseFloat(tempOperands[0])),
            operands: tempOperands,
            prevAction1: num.operation,
            prevAction2: state.prevAction1
          };
        }
        let indexToUpdate =
          lastOperandIndex === 0 ? 0 : lastOperandIndex === 1 ? 1 : 2;
        tempOperands[indexToUpdate] = mathjs.evaluate("-1 * " + num.input);
        return {
          ...state,
          display: formatDisplay(parseFloat(tempOperands[indexToUpdate])),
          operands: tempOperands,
          prevAction1: num.operation,
          prevAction2: state.prevAction1
        };
      } else if (
        (!state.display.startsWith("-") && state.display.length >= 11) ||
        (state.display.startsWith("-") && state.display.length >= 12)
      ) {
        return { ...state };
      } else {
        let indexToUpdate =
          lastOperandIndex === 0 ? 0 : lastOperandIndex === 1 ? 1 : 2;
        tempOperands[indexToUpdate] = tempOperands[indexToUpdate] + num.input;
        return {
          ...state,
          display: formatDisplay(parseFloat(tempOperands[indexToUpdate])),
          operands: tempOperands,
          prevAction1: num.operation,
          prevAction2: state.prevAction1
        };
      }
    }
    case DECIMAL: {
      const decimal = action.payload;

      if (
        (!state.display.startsWith("-") && state.display.length >= 11) ||
        (state.display.startsWith("-") && state.display.length >= 12)
      ) {
        return { ...state };
      } else if (
        state.prevAction1 === "operator" ||
        state.prevAction1 === "" ||
        state.prevAction1 === "clear" ||
        state.prevAction1 === "equals"
      ) {
        let indexToUpdate =
          lastOperandIndex === -1 ? 0 : lastOperandIndex === 0 ? 1 : 2;
        tempOperands[indexToUpdate] = "0." + tempOperands[indexToUpdate];
        return {
          ...state,
          display: "0.",
          operands: tempOperands,
          prevAction1: decimal.operation,
          prevAction2: state.prevAction1
        };
      } else if (!state.display.includes(".")) {
        let indexToUpdate =
          lastOperandIndex === 0 ? 0 : lastOperandIndex === 1 ? 1 : 2;
        tempOperands[indexToUpdate] = tempOperands[indexToUpdate] + ".";
        return {
          ...state,
          display: formatDisplay(parseFloat(tempOperands[indexToUpdate])) + ".",
          operands: tempOperands,
          prevAction1: decimal.operation,
          prevAction2: state.prevAction1
        };
      } else {
        return { ...state };
      }
    }
    case ADD_OR_SUBTRACT: {
      const addOrSubtract = action.payload;

      if (
        (!state.display.startsWith("-") && state.display.length > 11) ||
        (state.display.startsWith("-") && state.display.length > 12)
      ) {
        return { ...state };
      } else if (
        state.prevAction1 === "operator" ||
        (state.prevAction1 === "clear" && state.prevAction2 === "operator")
      ) {
        if (operatorIndex === 1) {
          tempOperators[0] = addOrSubtract.input;
          return {
            ...state,
            operators: tempOperators
          };
        } else {
          let expValue = mathjs.evaluate(
            state.operands[0] + state.operators[0] + state.operands[1]
          );
          tempOperators[0] = addOrSubtract.input;
          tempOperands[0] = expValue.toString();
          tempOperands[1] = "";
          return {
            ...state,
            display: formatDisplay(parseFloat(expValue)),
            operands: tempOperands,
            operators: tempOperators,
            prevAction1: addOrSubtract.operation,
            prevAction2: state.prevAction1
          };
        }
      } else if (
        state.prevAction1 === "number" &&
        state.prevAction2 === "equals"
      ) {
        tempOperands[0] = tempOperands[1];
        tempOperands[1] = "";
        return {
          ...state,
          operands: tempOperands,
          prevAction1: addOrSubtract.operation,
          prevAction2: state.prevAction1
        };
      } else if (state.prevAction1 === "equals" && state.operands[0] !== "") {
        tempOperands[0] = tempOperands[1];
        tempOperands[1] = "";
        tempOperators[0] = addOrSubtract.input;
        return {
          ...state,
          operands: tempOperands,
          operators: tempOperators,
          prevAction1: addOrSubtract.operation,
          prevAction2: state.prevAction1
        };
      } else if (lastOperandIndex === -1) {
        tempOperands[0] = "0";
        tempOperators[0] = addOrSubtract.operation;
        return {
          ...state,
          operands: tempOperands,
          operators: tempOperators,
          prevAction1: addOrSubtract.operation,
          prevAction2: state.prevAction1
        };
      } else if (lastOperatorIndex === -1) {
        tempOperators[0] = addOrSubtract.input;
        return {
          ...state,
          operators: tempOperators,
          prevAction1: addOrSubtract.operation,
          prevAction2: state.prevAction1
        };
      } else if (lastOperatorIndex === 0) {
        let expValue = mathjs.evaluate(
          state.operands[0] + state.operators[0] + state.operands[1]
        );

        tempOperands[0] = expValue.toString();
        tempOperands[1] = "";
        tempOperators[0] = addOrSubtract.input;
        return {
          ...state,
          display: formatDisplay(parseFloat(expValue)),
          operands: tempOperands,
          operators: tempOperators,
          prevAction1: addOrSubtract.operation,
          prevAction2: state.prevAction1
        };
      } else {
        let exp = "";
        for (let i = 0; i < state.operands.length - 1; i++) {
          exp += state.operands[i];
          exp += state.operators[i];
        }
        exp += state.operands[2];
        let expValue = mathjs.evaluate(exp);

        tempOperands[0] = expValue.toString();
        tempOperands[1] = "";
        tempOperands[2] = "";
        tempOperators[0] = addOrSubtract.input;
        tempOperators[1] = "";
        return {
          ...state,
          display: formatDisplay(expValue),
          operands: tempOperands,
          operators: tempOperators,
          prevAction1: addOrSubtract.operation,
          prevAction2: state.prevAction1
        };
      }
    }
    case MULTIPLY_OR_DIVIDE: {
      const multiplyOrDivide = action.payload;

      if (
        (!state.display.startsWith("-") && state.display.length > 11) ||
        (state.display.startsWith("-") && state.display.length > 12)
      ) {
        return { ...state };
      } else if (
        state.prevAction1 === "operator" ||
        (state.prevAction1 === "clear" && state.prevAction2 === "operator")
      ) {
        if (lastOperatorIndex === 0) {
          tempOperators[0] = multiplyOrDivide.input;
          return {
            ...state,
            operators: tempOperators
          };
        } else {
          if (state.operators[1] === "/" || state.operators[1] === "*") {
            tempOperators[1] = multiplyOrDivide.input;
            return {
              ...state,
              operators: tempOperators
            };
          }
          let expValue = mathjs.evaluate(
            state.operands[0] + state.operators[0] + state.operands[1]
          );

          tempOperators[1] = multiplyOrDivide.input;
          tempOperands[0] = expValue.toString();
          tempOperands[1] = "";
          tempOperands[2] = "";
          return {
            ...state,
            operators: tempOperators,
            operands: tempOperands,
            display: formatDisplay(expValue),
            prevAction1: multiplyOrDivide.operation,
            prevAction2: state.prevAction1
          };
        }
      } else if (
        state.prevAction1 === "number" &&
        state.prevAction2 === "equals"
      ) {
        tempOperands[0] = state.operands[1];
        tempOperands[1] = "";
        return {
          ...state,
          operands: tempOperands,
          prevAction1: multiplyOrDivide.operation,
          prevAction2: state.prevAction1
        };
      } else if (state.prevAction1 === "equals" && state.operands[0] !== "") {
        tempOperands[0] = state.operands[1];
        tempOperands[1] = "";
        tempOperators[0] = multiplyOrDivide.input;
        return {
          ...state,
          operands: tempOperands,
          operators: tempOperators,
          prevAction1: multiplyOrDivide.operation,
          prevAction2: state.prevAction1
        };
      } else if (lastOperandIndex === -1) {
        tempOperands[0] = "0";
        tempOperators[0] = multiplyOrDivide.input;
        return {
          ...state,
          operands: tempOperands,
          operators: tempOperators,
          prevAction1: multiplyOrDivide.operation,
          prevAction2: state.prevAction1
        };
      } else if (lastOperatorIndex === -1) {
        tempOperators[0] = multiplyOrDivide.input;
        return {
          ...state,
          operators: tempOperators,
          prevAction1: multiplyOrDivide.operation,
          prevAction2: state.prevAction1
        };
      } else if (lastOperandIndex === 0) {
        if (state.operators[0] === "*" || state.operators[1] === "/") {
          let expValue = mathjs.evaluate(
            state.operands[0] + state.operators[0] + state.operands[1]
          );
          tempOperands[0] = expValue;
          tempOperands[1] = "";
          tempOperands[2] = "";
          tempOperators[0] = multiplyOrDivide.input;
          tempOperators[1] = "";
          return {
            ...state,
            display: formatDisplay(expValue),
            operands: tempOperands,
            operators: tempOperators,
            prevAction1: multiplyOrDivide.operation,
            prevAction2: state.prevAction1
          };
        }
      }
      let expValue = mathjs.evaluate(
        state.operands[1] + state.operators[1] + state.operands[2]
      );
      tempOperands[1] = expValue;
      tempOperands[2] = "";
      tempOperators[1] = multiplyOrDivide.input;
      return {
        ...state,
        display: formatDisplay(expValue),
        operands: tempOperands,
        operators: tempOperators,
        prevAction1: multiplyOrDivide.operation,
        prevAction2: state.prevAction1
      };
    }
    case EQUALS: {
      const equals = action.payload;
      if (state.prevAction1 === "operator") {
        if (lastOperatorIndex === 0) {
          let expValue = mathjs.evaluate(
            state.operands[0] + state.operators[0] + state.operands[0]
          );
          tempOperands[1] = expValue.toString();
          tempOperators[1] = "";
          return {
            ...state,
            display: formatDisplay(expValue),
            operands: tempOperands,
            operators: tempOperators,
            prevAction1: equals.operation,
            prevAction2: state.prevAction1
          };
        } else {
          let expValue = mathjs.evaluate(
            state.operands[0] +
              state.operators[0] +
              state.operands[1] +
              state.operators[1] +
              state.operands[1]
          );
          tempOperands[0] = state.operands[1];
          tempOperands[1] = expValue;
          tempOperands[2] = "";
          tempOperators[0] = state.operators[1];
          tempOperators[1] = "";

          return {
            ...state,
            display: formatDisplay(expValue),
            operands: tempOperands,
            operators: tempOperators,
            prevAction1: equals.operation,
            prevAction2: state.prevAction1
          };
        }
      } else if (state.prevAction1 === "equals") {
        if (operatorIndex === 1) {
          let expValue = mathjs.evaluate(
            state.operands[0] + state.operators[0] + state.operands[1]
          );
          tempOperands[1] = expValue;
          return {
            ...state,
            display: formatDisplay(expValue),
            operands: tempOperands,
            prevAction1: equals.operation,
            prevAction2: state.prevAction1
          };
        } else {
          return { ...state };
        }
      } else if (
        state.prevAction1 === "number" &&
        state.prevAction2 === "equals"
      ) {
        if (operandIndex === 2) {
          let expValue = mathjs.evaluate(
            state.operands[0] + state.operators[0] + state.operands[1]
          );
          tempOperands[1] = expValue;
          return {
            ...state,
            display: formatDisplay(expValue),
            operands: [state.operands[0], expValue, ""],
            prevAction1: equals.operation,
            prevAction2: state.prevAction1
          };
        } else if (operandIndex === -1) {
          let expValue = mathjs.evaluate(
            state.operands[0] +
              state.operators[0] +
              state.operands[1] +
              state.operators[1] +
              state.operands[2]
          );
          tempOperands[0] = state.operands[2];
          tempOperands[1] = expValue;
          tempOperands[2] = "";
          tempOperators[0] = state.operators[1];
          tempOperators[1] = "";
          return {
            ...state,
            display: formatDisplay(expValue),
            operands: tempOperands,
            operators: tempOperators,
            prevAction1: equals.operation
          };
        } else {
          return { ...state };
        }
      } else {
        if (lastOperandIndex === 0) {
          return {
            ...state,
            prevAction1: equals.operation,
            prevAction2: state.prevAction1
          };
        } else if (lastOperandIndex === 1) {
          let expValue = mathjs.evaluate(
            state.operands[0] + state.operators[0] + state.operands[1]
          );
          tempOperands[0] = state.operands[1];
          tempOperands[1] = expValue;
          tempOperands[2] = "";
          return {
            ...state,
            display: formatDisplay(expValue),
            operands: tempOperands,
            prevAction1: equals.operation,
            prevAction2: state.prevAction1
          };
        } else if (operandIndex === -1) {
          let expValue = mathjs.evaluate(
            state.operands[0] +
              state.operators[0] +
              state.operands[1] +
              state.operators[1] +
              state.operands[2]
          );
          tempOperands[0] = state.operands[0];
          tempOperands[1] = expValue;
          tempOperands[2] = "";
          tempOperators[0] = state.operators[1];
          tempOperators[1] = "";

          return {
            ...state,
            display: formatDisplay(expValue),
            operands: tempOperands,
            operators: tempOperators,
            prevAction1: equals.operation
          };
        }
        return { ...state };
      }
    }
    case CLEAR: {
      if (state.prevAction1 === "operator") {
        return {
          ...state,
          display: "0",
          prevAction1: "clear",
          prevAction2: state.prevAction1
        };
      }
      return {
        ...state,
        display: "0",
        operands: ["", "", ""],
        operators: ["", ""],
        prevAction1: "",
        prevAction2: ""
      };
    }
    case NEGATE: {
      const negate = action.payload;
      if (state.prevAction1 === "") {
        tempOperands[0] = "-0";
        return {
          ...state,
          display: "-0",
          operands: tempOperands,
          prevAction1: negate.operation
        };
      } else if (
        state.prevAction1 === "number" ||
        state.prevAction1 === "decimal"
      ) {
        let indexToUpdate =
          lastOperandIndex === 0 ? 0 : lastOperandIndex === 1 ? 1 : 2;
        let exp = mathjs.evaluate("-1 *" + tempOperands[indexToUpdate]);
        tempOperands[indexToUpdate] = exp.toString();
        return {
          ...state,
          display: formatDisplay(exp),
          operands: tempOperands
        };
      } else if (state.prevAction1 === "operator") {
        const negate = action.payload;
        tempOperands[1] = "-0";

        return {
          ...state,
          display: "-0",
          operands: tempOperands,
          prevAction1: negate.operation,
          prevAction2: state.prevAction1
        };
      } else if (state.prevAction1 === "equals") {
        return {
          ...state,
          display: mathjs.evaluate("-1 *" + state.display).toString(),
          operands: [
            state.operands[0],
            mathjs.evaluate("-1 *" + state.operands[1]).toString(),
            ""
          ]
        };
      } else {
        return {
          ...state
        };
      }
    }
    case PERCENT: {
      const percent = action.payload;
      if (state.prevAction1 === "number") {
        let indexToUpdate =
          lastOperandIndex === 0 ? 0 : lastOperandIndex === 1 ? 1 : 2;
        let expValue = mathjs.evaluate("0.01*" + state.operands[indexToUpdate]);
        tempOperands[indexToUpdate] = expValue;
        return {
          ...state,
          display: formatDisplay(expValue),
          operands: tempOperands,
          prevAction1: percent.operation,
          prevAction2: state.prevAction1
        };
      } else if (state.prevAction1 === "operator") {
        if (lastOperatorIndex === 0) {
          if (state.operators[0] === "+" || state.operators[0] === "-") {
            return {
              ...state,
              display: mathjs.evaluate(
                "0.01*(" + state.display + "*" + state.display + ")"
              ),
              operands: [
                state.operands[0],
                mathjs.evaluate(
                  "0.01*(" + state.display + "*" + state.display + ")"
                ),
                ""
              ],
              prevAction1: percent.operation,
              prevAction2: state.prevAction1
            };
          } else {
            return {
              ...state,
              display: mathjs.evaluate("0.01*" + state.display),
              operands: [
                state.operands[0],
                mathjs.evaluate("0.01*" + state.display),
                ""
              ],
              prevAction1: percent.operation,
              prevAction2: state.prevAction1
            };
          }
        }
      } else if (state.prevAction1 === "equals") {
        return {
          ...state,
          display: mathjs.evaluate("0.01*" + state.display),
          operands: [
            state.operands[0],
            mathjs.evaluate("0.01*" + state.operands[1])
          ].concat([""]),
          prevAction1: percent.operation,
          prevAction2: state.prevAction1
        };
      }
      return { ...state };
    }
    default:
      return state;
  }
}
