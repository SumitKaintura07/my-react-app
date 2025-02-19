import React, { useEffect, useState } from "react";

function UseEffectDemo() {
  const [data, setData] = useState(10);

  //   componentdidmount  + componentdidupdate
  useEffect(() => {
    alert("called every time.");
  });

  //   componentdidmount
  useEffect(() => {
    // use for api calling
    alert("called one time on mount.");
  }, []);

  //   componentdidupdate
  useEffect(() => {
    alert("called when data changes.");
  }, [data]);

  //   componentwillunmount
//   useEffect(() => {
//     return () => alert("comp will unmount.");
//   }, []);

  const toggleShow = () => {
    setData((prevData) => prevData + 1);
  };

  return (
    <div>
      <br />
      This is UseEffectDemo. {data}
      <br />
      <button onClick={toggleShow}>Increase Data</button>
    </div>
  );
}

export default UseEffectDemo;
