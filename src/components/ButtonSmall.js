import React from "react";
import {
  addOrSubtractClicked,
  multiplyOrDivideClicked,
  clearClicked,
  numberClicked,
  decimalClicked,
  equalsClicked,
  negateClicked,
  percentClicked
} from "../actions/actions";
import { connect } from "react-redux";
import "./ButtonSmall.scss";

class ButtonSmall extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicks = this.handleClicks.bind(this);
  }

  handleClicks(e) {
    if (this.props.id === "clear") {
      this.props.clear();
    } else if (this.props.id === "negate") {
      this.props.negate();
    } else if (this.props.id === "percent") {
      this.props.percent();
    } else if (this.props.id === "add" || this.props.id === "subtract") {
      this.props.addOrSubtract(this.props.value);
    } else if (this.props.id === "multiply" || this.props.id === "divide") {
      this.props.multiplyOrDivide(this.props.value);
    } else if (this.props.id === "decimal") {
      this.props.decimal(this.props.value);
    } else if (this.props.id === "equals") {
      this.props.equals(this.props.value);
    } else {
      this.props.number(this.props.value);
    }
  }

  render() {
    return (
      <button
        id={this.props.id}
        value={this.props.value}
        className={`d-flex justify-content-center align-items-center button-small mb-3 p-0 rounded-circle ${this.props.color}-btn`}
        s
        onClick={this.handleClicks}
      >
        {this.props.button}
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(clearClicked()),
  addOrSubtract: (value) => dispatch(addOrSubtractClicked(value)),
  multiplyOrDivide: (value) => dispatch(multiplyOrDivideClicked(value)),
  number: (value) => dispatch(numberClicked(value)),
  decimal: (value) => dispatch(decimalClicked(value)),
  equals: () => dispatch(equalsClicked()),
  negate: () => dispatch(negateClicked()),
  percent: () => dispatch(percentClicked())
});

export default connect(null, mapDispatchToProps)(ButtonSmall);
