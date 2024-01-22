import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Autocomplete,
  Modal,
  Box,
} from "@mui/material";
import { tokenContext } from "../../InfoProvider.tsx";
import axios from "axios";
import { DateTime } from "luxon";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoCard = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [cycleInput, setCycleInput] = useState(3);
  const [todoUsers, setTodoUsers] = useState<any>([]); // [id, id, id]
  const [todos, setTodos] = useState([]);
  const [token] = useContext(tokenContext);
  const [wgMembers, setWgMembers] = useState<any>([]);
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

  const api_url = `${import.meta.env.VITE_API_URL}`;

  const loadTodos = async () => {
    try {
      const response = await axios.get(`${api_url}/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let todos = response.data;
      if (todos.length > 0) {
        todos = await Promise.all(
          todos.map(async (todo: any) => {
            const details = await getTodoDetails(todo.id);
            return { ...todo, details };
          })
        );
      }
      setTodos(todos);
      console.log(todos);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const loadWgMembers = async () => {
    try {
      const response = await axios.get(`${api_url}/wg`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.Users) {
        console.log(response.data.Users);
        setWgMembers(response.data.Users);
      } else {
        console.log("No WG created yet");
      }
    } catch (error) {
      console.error("Error loading wg details:", error);
    }
    console.log(wgMembers);
  };

  useEffect(() => {
    loadTodos();
    loadWgMembers();
  }, []);

  const getUserId = async () => {
    try {
      const response = await axios.get(`${api_url}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.id;
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const getTodoDetails = async (id: string) => {
    try {
      const response = await axios.get(`${api_url}/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
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
          `${api_url}/todo`,
          {
            title: todoInput,
            ids: todoUsers.map((user: any) => user.id),
            description: todoDescription,
            startdate: DateTime.now().toISODate(),
            frequenz: cycleInput.toString(),
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
      setOpen(false);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`${api_url}/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const getDateAndUser = (todoDetails: any[]) => {
    return todoDetails.map((detail: any, index) => {
      const formattedDate = DateTime.fromISO(detail.nextTurn).toFormat(
        "dd LLL"
      );
      const userName = wgMembers.find(
        (user: any) => user.id === detail.userid
      )?.name;

      return (
        <p key={index}>
          {formattedDate}: {userName}
        </p>
      );
    });
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
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                label="Add Todo"
                variant="outlined"
              />
              <TextField
                style={{ paddingLeft: "5px" }}
                value={todoDescription}
                onChange={(e) => setTodoDescription(e.target.value)}
                label="Todo Description"
                variant="outlined"
              />
              <TextField
                style={{ marginTop: "10px" }}
                value={cycleInput}
                onChange={(e) => setCycleInput(parseInt(e.target.value))}
                type="number"
                label="Repeat every x days"
                variant="outlined"
              />
              <Autocomplete
                style={{ marginTop: "10px" }}
                multiple
                id="tags-standard"
                options={wgMembers}
                onChange={(event, value: any) => {
                  console.log(event);
                  setTodoUsers(value);
                  console.log(todoUsers);
                }}
                getOptionLabel={(option: any) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Who's responsible?"
                    placeholder="Users"
                  />
                )}
              />
              <Button
                style={{ marginTop: "10px" }}
                onClick={handleAddTodo}
                variant="contained"
                color="primary"
              >
                Add
              </Button>{" "}
            </Box>
          </Modal>
          <TableContainer
            component={Paper}
            style={{ maxHeight: 300, overflow: "auto" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Title</b>
                  </TableCell>
                  <TableCell>
                    <b>Description</b>
                  </TableCell>
                  <TableCell>
                    <b>Cycle</b>
                  </TableCell>
                  <TableCell>
                    <b>Delete</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo: any, index) => (
                  <TableRow key={index}>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>{getDateAndUser(todo.details)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                        <DeleteIcon color="warning" />
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

export default TodoCard;
