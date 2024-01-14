import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { tokenContext } from "../../AuthProvider.tsx";
import axios from "axios";
const GroceryCard = () => {
  const [groceryInput, setGroceryInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [groceries, setGroceries] = useState([]);
  const [token] = useContext(tokenContext);
  const [listId, setListId] = useState("");

  const getUserId = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.id;
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };
  const loadGroceries = async () => {
    let items = [];
    try {
      const response = await axios.get("http://localhost:3001/shoppingList", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.length > 0) {
        const id = response.data[0].id;
        const listResponse = await axios.get(
          `http://localhost:3001/shoppingList/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setListId(id);
        items = listResponse.data.items;
      } else {
        const userId = await getUserId();
        const createListResponse = axios
          .post(
            "http://localhost:3001/shoppingList",
            {
              name: "default",
              userIds: [userId],
              items: [],
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setListId(response.data.id);
            console.log("Erfolgreich gesendet:", response.data);
          })
          .catch((error) => {
            console.error("Fehler beim Senden:", error);
          });
      }
      setGroceries(items);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  useEffect(() => {
    loadGroceries();
  }, []);

  const handleAddGrocery = () => {
    if (groceryInput.trim() !== "") {
      const amount = quantityInput ? quantityInput : 1;

      axios
        .post(
          `http://localhost:3001/shoppingList/${listId}/items`,
          {
            name: groceryInput,
            quantity: amount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Erfolgreich gesendet:", response.data);
          loadGroceries();
          setGroceryInput("");
          setQuantityInput("");
        })
        .catch((error) => {
          console.error("Fehler beim Senden:", error);
        });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:3001/shoppingList/${listId}/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await loadGroceries();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Shopping List
        </Typography>
        <CardContent sx={{ height: 200, overflowY: "auto" }}>
          <TextField
            value={groceryInput}
            onChange={(e) => setGroceryInput(e.target.value)}
            label="Add Item"
            variant="outlined"
          />
          <TextField
            value={quantityInput}
            onChange={(e) => setQuantityInput(parseInt(e.target.value))}
            type="number"
            label="Add Quantity"
            variant="outlined"
          />
          <Button
            onClick={handleAddGrocery}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
          <List>
            <ListItem>
              <ListItemText primary={<b>Item</b>} />
              <ListItemText primary={<b>Quantity</b>} />
              <ListItemText primary={<b>Delete</b>} />
            </ListItem>
            {groceries.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} />
                <ListItemText primary={item.quantity} />
                <ListItemButton
                  key={index}
                  onClick={() => handleDeleteTodo(item.id)}
                >
                  Bought it!
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default GroceryCard;
