import React, { Component } from "react";
// import Home from "./home";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  toggleShow = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  render() {
    return (
      <div>
        {this.state.show && <p>This is the class section.</p>}

        <button onClick={this.toggleShow}>
          {this.state.show ? "Hide" : "Show"}
          {/* {this.state.show ? <Home /> : "Show"} */}
        </button>
      </div>
    );
  }
}

export default About;
