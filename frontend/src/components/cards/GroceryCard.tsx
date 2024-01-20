import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { tokenContext } from "../../InfoProvider";
import axios from "axios";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
const GroceryCard = () => {
  const [groceryInput, setGroceryInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [groceries, setGroceries] = useState([]);
  const [token] = useContext(tokenContext);
  const [listId, setListId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    alignItems: "center",
    textAlign: "center" as "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
        <CardContent>
          <Button style={{ marginBottom: "10px" }} onClick={handleOpen}>
            Add Todo
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                style={{ paddingRight: "5px" }}
                value={groceryInput}
                onChange={(e) => setGroceryInput(e.target.value)}
                label="Add Item"
                variant="outlined"
              />
              <TextField
                value={quantityInput}
                style={{ paddingLeft: "5px" }}
                onChange={(e) => setQuantityInput(parseInt(e.target.value))}
                type="number"
                label="Add Quantity"
                variant="outlined"
              />
              <Button
                style={{ marginTop: "10px" }}
                onClick={handleAddGrocery}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </Box>
          </Modal>
          <TableContainer
            component={Paper}
            style={{ maxHeight: 300, overflow: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Item</b>
                  </TableCell>
                  <TableCell>
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell>
                    <b>Shopped it!</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groceries.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteTodo(item.id)}>
                        <ShoppingCartCheckoutIcon color="warning" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>{" "}
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default GroceryCard;
