import React, { Component } from "react";
import { getDisplay } from "../selectors/selectors";
import { connect } from "react-redux";
import "./Display.scss";

class Display extends Component {
  render() {
    let fontClass = "";
    if (this.props.display.length < 9) {
      fontClass = "font-62";
    } else if (this.props.display.length === 9) {
      fontClass = "font-50";
    } else if (this.props.display.length === 10) {
      fontClass = "font-45";
    } else if (this.props.display.length === 11) {
      fontClass = "font-40";
    } else {
      fontClass = "font-38";
    }

    return (
      <div className="container">
        <div className="row">
          <div
            id="display"
            className={`d-flex justify-content-end ${fontClass}`}
          >
            <div>{this.props.display}</div>
          </div>
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

export default connect(mapStateToProps, null)(Display);
