import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./routing/about";
import Home from "./routing/home";
import UseEffectDemo from "./hooks/useEffectDemo";
import AxiosDemo from "./components/axiosDemo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Form from "./components/Form";
import LifecycleDemo from "./components/lifeCycleDemo";
import MyComponent from "./components/myComponent";
import React from "react";

// Create and export the context
export const MyContext = React.createContext();

function App() {
  return (
    // Primitive Values strings, numbers, or booleans.
    <MyContext.Provider value="Hello from Use Context Hook.">
      {/* Arrays
      <MyContext.Provider value={["apple", "banana", "cherry"]}> */}
      {/* Objects
      <MyContext.Provider value={{ theme: "dark", language: "en" }}> */}
      {/* Functions
State and state updaters
Reducers and dispatch functions
Dynamic or computed values
Nested contexts
React components */}
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/form" element={<Form />} />
              <Route path="/lifeCycleDemo" element={<LifecycleDemo />} />
              <Route path="/axios-demo" element={<AxiosDemo />} />
              <Route path="/use-effect-demo" element={<UseEffectDemo />} />
              <Route path="/myComponent" element={<MyComponent />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
