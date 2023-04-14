import React from "react";
import Display from "./components/Display";
import ButtonPad from "./components/ButtonPad";
import { getDisplay } from "./selectors/selectors";
import { connect } from "react-redux";
import "./styles.scss";
import "./Calculator.scss";

class Calculator extends React.Component {
  render() {
    return (
      <div class="container d-flex justify-content-center align-items-center">
        <div className="screen border mt-3 p-3">
          <Display display={this.props.display} />
          <ButtonPad display={this.props.display} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const displayValue = getDisplay(state);
  return {
    display: displayValue
  };
};

export default connect(mapStateToProps, null)(Calculator);
