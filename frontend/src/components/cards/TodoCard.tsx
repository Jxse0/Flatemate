import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
  ListItemButton,
} from "@mui/material";
import { tokenContext } from "../../InfoProvider.tsx";
import axios from "axios";
import { DateTime } from "luxon";

const TodoCard = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [token] = useContext(tokenContext);

  const loadTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

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

  const handleAddTodo = async () => {
    if (todoInput.trim() !== "" && todoDescription.trim() !== "") {
      const userid = await getUserId();
      console.log(userid);
      if (!userid) {
        console.error("User ID not found");
        return;
      }
      axios
        .post(
          "http://localhost:3001/todo",
          {
            title: todoInput,
            ids: [userid],
            description: todoDescription,
            startdate: DateTime.now().toISODate(),
            frequenz: "3",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Erfolgreich gesendet:", response.data);
          loadTodos();
        })
        .catch((error) => {
          console.error("Fehler beim Senden:", error);
        });

      setTodoInput("");
      setTodoDescription("");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <CardContent>
          <TextField
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            label="Add Todo"
            variant="outlined"
          />
          <TextField
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            label="Todo Description"
            variant="outlined"
          />
          <Button onClick={handleAddTodo} variant="contained" color="primary">
            Add
          </Button>
          <List>
            <ListItem>
              <ListItemText primary={<b>Title</b>} />
              <ListItemText primary={<b>Description</b>} />
              <ListItemText primary={<b>Delete</b>} />
            </ListItem>
            {todos.map((todo, index) => (
              <ListItem key={index}>
                <ListItemText primary={todo.title} />
                <ListItemText primary={todo.description} />
                <ListItemButton
                  key={index}
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Done!
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
