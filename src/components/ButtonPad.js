import { Component } from "react";
import ButtonSmall from "./ButtonSmall";
import ButtonLarge from "./ButtonLarge";
import "./ButtonPad.scss";

class ButtonPad extends Component {
  render() {
    const isAC =
      this.props.prevAction1 === "" || this.props.prevAction1 === "clear";

    let operatorIndex = 0;
    if (Array.isArray(this.props.operators)) {
      operatorIndex = this.props.operators.findIndex(
        (operator) => operator === ""
      );
    }
    let lastOperator = "";
    if (Array.isArray(this.props.operators) && operatorIndex !== 0) {
      const lastOperatorIndex = this.props.operators.findLastIndex(
        (operator) => operator !== ""
      );
      lastOperator = this.props.operators[lastOperatorIndex];
    }

    return (
      <div className="container button-pad mt-3">
        <div className="row">
          <div className="col-6 p-0">
            <div className="d-flex justify-content-around">
              {isAC && (
                <ButtonSmall
                  button={"AC"}
                  id={"clear"}
                  type={"clear"}
                  color={"light"}
                />
              )}
              {!isAC && (
                <ButtonSmall
                  button={"C"}
                  id={"clear"}
                  type={"clear"}
                  color={"light"}
                />
              )}
              <ButtonSmall
                button={"\u00B1"}
                id={"negate"}
                type={"negate"}
                color={"light"}
              />
            </div>

            <div className="d-flex justify-content-around">
              <ButtonSmall
                button={"7"}
                id={"seven"}
                value={"7"}
                type={"number"}
                color={"dark"}
              />
              <ButtonSmall
                button={"8"}
                id={"eight"}
                value={"8"}
                type={"number"}
                color={"dark"}
              />
            </div>

            <div className="d-flex justify-content-around">
              <ButtonSmall
                button={"4"}
                id={"four"}
                value={"4"}
                type={"number"}
                color={"dark"}
              />
              <ButtonSmall
                button={"5"}
                id={"five"}
                value={"5"}
                type={"number"}
                color={"dark"}
              />
            </div>

            <div className="d-flex justify-content-around">
              <ButtonSmall
                button={"1"}
                id={"one"}
                value={"1"}
                type={"number"}
                color={"dark"}
              />
              <ButtonSmall
                button={"2"}
                id={"two"}
                value={"2"}
                type={"number"}
                color={"dark"}
              />
            </div>
            <div className="d-flex px-2">
              <ButtonLarge
                button={"0"}
                id={"zero"}
                value={"0"}
                type={"number"}
                color={"dark"}
              />
            </div>
          </div>
          <div className="col-3 p-0">
            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"%"}
                id={"percent"}
                type={"percent"}
                color={"light"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"9"}
                id={"nine"}
                value={"9"}
                type={"number"}
                color={"dark"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"6"}
                id={"six"}
                value={"6"}
                type={"number"}
                color={"dark"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"3"}
                id={"three"}
                value={"3"}
                type={"number"}
                color={"dark"}
              />
            </div>

            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"."}
                id={"decimal"}
                value={"."}
                type={"decimal"}
                color={"dark"}
              />
            </div>
          </div>
          <div className="col-3 p-0">
            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"\u00F7"}
                id={"divide"}
                type={"operator"}
                value={"/"}
                color={"orange"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"\u00D7"}
                id={"multiply"}
                value={"*"}
                type={"operator"}
                color={"orange"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"\u2212"}
                id={"subtract"}
                value={"-"}
                type={"operator"}
                color={"orange"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"+"}
                id={"add"}
                value={"+"}
                type={"operator"}
                color={"orange"}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ButtonSmall
                button={"="}
                id={"equals"}
                value={"="}
                type={"equals"}
                color={"orange"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ButtonPad;
