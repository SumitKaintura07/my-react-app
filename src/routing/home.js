import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { MyContext } from "../App"; // Import MyContext

// Home Component
function Home() {
  const contextValue = useContext(MyContext);

  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);
  const [showList, setShowList] = useState(false);

  // Event Handling: Toggle list visibility
  const toggleList = () => {
    setShowList(!showList);
  };

  return (
    <div>
      <h1>useContext Value: {contextValue}</h1>

      <h1>Home Page</h1>
      <button onClick={toggleList}>
        {showList ? "Hide List" : "Show List"}
      </button>

      {/* Conditional Rendering: Show list if `showList` is true */}
      {showList && (
        <ul>
          {/* List Rendering */}
          {items.map((item, index) => (
            <li key={index}>
              <Link to={`/item/${index}`}>{item}</Link>
            </li>
          ))}
        </ul>
      )}

      {/* Nested Routing */}
      <Routes>
        <Route path="/item/:id" element={<ItemDetail items={items} />} />
      </Routes>
    </div>
  );
}

// ItemDetail Component for Nested Routing
function ItemDetail({ items }) {
  const { id } = useParams();
  const item = items[parseInt(id)];

  return (
    <div>
      <h2>Item Detail</h2>
      <p>{item}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Home;
