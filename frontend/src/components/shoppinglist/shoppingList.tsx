// ShoppingList.js
import React, { useState } from "react";
import RotateCards from "../dashboard/RotateCards";

const ShoppingList = () => {
  // State to manage the items in the shopping list
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);

  return (
  
  <div >
      <RotateCards></RotateCards>
       </div>
  );
};

export default ShoppingList;
