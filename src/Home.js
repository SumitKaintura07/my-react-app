import React, { Component } from "react";
import PropTypes from "prop-types";

class Home extends Component {
  componentWillUnmount() {
    alert("comp going to unmount.");
  }

  render() {
    return <div>This is child component.</div>;
  }
}

export default Home;
