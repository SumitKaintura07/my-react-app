import React, {
  useContext,
  useEffect,
  useRef,
  useReducer,
  useCallback,
  useState,
  useMemo,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { MyContext } from "../App"; // Import MyContext

// Reducer function for useReducer
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
};

// Custom component to demonstrate useImperativeHandle
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // useImperativeHandle: Expose focus method to parent component
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} placeholder="Custom Input" />;
});

const MyComponent = () => {
  // useContext
  const contextValue = useContext(MyContext);

  // useReducer
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // useState
  const [name, setName] = useState("");

  // useRef
  const inputRef = useRef(null);
  const customInputRef = useRef(null);

  // useMemo: Memoize a computed value
  const memoizedValue = useMemo(() => {
    return `Computed value based on count: ${state.count * 2}`;
  }, [state.count]);

  // useEffect
  useEffect(() => {
    console.log("Component mounted or updated");
    inputRef.current.focus(); // Focus on input when component mounts
  }, []);

  // useLayoutEffect
  useLayoutEffect(() => {
    console.log("useLayoutEffect: Runs synchronously after DOM mutations");
  }, [state.count]);

  // useCallback
  const handleIncrement = useCallback(() => {
    dispatch({ type: "increment" });
  }, []);

  // useState handler
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Focus on custom input
  const focusCustomInput = () => {
    customInputRef.current.focus();
  };

  return (
    <div>
      <div>
        <br />
        <br />
        <h2>useContext → Accesses values from a React context.</h2>
        <h2>useContext Example:</h2>
        <h2>Value: {contextValue}</h2>
      </div>
      <div>
        <br />
        <br />
        <h2>
          useReducer → Manages complex state logic with a reducer function.
        </h2>
        <h2>useReducer Example:</h2>
        <h2>Count: {state.count}</h2>
      </div>
      <div>
        <br />
        <br />
        <h2>useMemo Example:</h2>
        <h2>{memoizedValue}</h2>
      </div>
      <div>
        <br />
        <br />
        <h2>
          useRef → Creates a persistent reference without causing re-renders.
        </h2>
        <h2>useRef Example:</h2>
        <input ref={inputRef} placeholder="Focus on mount (useRef)" />
      </div>
      <div>
        <br />
        <br />
        <h2>useState Example:</h2>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name (useState)"
        />
      </div>
      <div>
        <br />
        <br />
        <h2>useImperativeHandle Example:</h2>
        <CustomInput ref={customInputRef} />
        <button onClick={focusCustomInput}>
          Focus Custom Input (useImperativeHandle)
        </button>
      </div>
      <div>
        <br />
        <br />
        <h2>
          useCallback → Memoizes a function to prevent unnecessary re-creations.
        </h2>
        <h2>useCallback Example:</h2>
        <button onClick={handleIncrement}>Increment (useCallback)</button>
      </div>
      <br />
      <br />
    </div>
  );
};

export default MyComponent;
