import React from "react";
import { numberClicked } from "../actions/actions";
import { connect } from "react-redux";
import "./ButtonLarge.scss";

class ButtonLarge extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicks = this.handleClicks.bind(this);
  }

  handleClicks(e) {
    this.props.number(this.props.display);
  }
  render() {
    return (
      <button
        id={this.props.id}
        value={this.props.value}
        className="button-large"
        onClick={this.handleClicks}
      >
        {this.props.button}
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  number: () => (display) => dispatch(numberClicked(display))
});

export default connect(null, mapDispatchToProps)(ButtonLarge);
