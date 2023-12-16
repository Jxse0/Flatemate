// ShoppingList.js
import React, { useState } from "react";
import Cards from "../Newtry/rotate";

const ShoppingList = () => {
  // State to manage the items in the shopping list
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);

  return (
  
  <div >
      <Cards></Cards>
       </div>
  );
};

export default ShoppingList;
