import React, { Component } from "react";

class LifecycleDemo extends Component {
  // 1. Constructor
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: "Hello, React!",
    };
    console.log("Constructor: Component is being constructed");
  }

  // 2. componentDidMount (Runs after the component is mounted to the DOM)
  componentDidMount() {
    console.log("componentDidMount: Component is mounted to the DOM");
    // Example: Fetch data from an API
    setTimeout(() => {
      this.setState({ message: "Data fetched successfully!" });
    }, 2000);
  }

  // 3. componentDidUpdate (Runs after the component updates)
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate: Component has been updated");
    if (prevState.count !== this.state.count) {
      console.log(
        `Count changed from ${prevState.count} to ${this.state.count}`
      );
    }
  }

  // 4. componentWillUnmount (Runs before the component is removed from the DOM)
  componentWillUnmount() {
    console.log("componentWillUnmount: Component is about to be unmounted");
  }

  // 5. shouldComponentUpdate (Controls whether the component should re-render)
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate: Deciding whether to re-render");
    // Only re-render if the count has changed
    return nextState.count !== this.state.count;
  }

  // 6. Render method (Renders the component's UI)
  render() {
    console.log("Render: Rendering the component");
    return (
      <div className="container mt-4">
        <h2>React Lifecycle Methods Demo</h2>
        <p>{this.state.message}</p>
        <p>Count: {this.state.count}</p>
        <button
          className="btn btn-primary"
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          Increment Count
        </button>
      </div>
    );
  }
}

export default LifecycleDemo;
