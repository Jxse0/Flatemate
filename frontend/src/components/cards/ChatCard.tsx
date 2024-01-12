import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";

function ChatBoxCard() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("Response goes here");

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    //This will handle the ChatGPT API
    setResponse("AImigo is thinking....");

    const response = await axios({
      method: "post",
      url: "http://localhost:3001/gpt",
      data: { message: prompt },
    });

    setResponse(response.data.message);
  };

  return (
    <Card sx={{ 
      height: 300, 
      display: "flex", 
      flexDirection: "column", 
      background: "var(--cardBackground)", 
      borderRadius: "8px",
      boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.65)"
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" sx={{ color: "var(--textColor)" }}>
          Ask AImigo
        </Typography>
        <Box
          id="message-container"
          sx={{
            maxHeight: "150px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          {response && (
            <Typography variant="body1" component="p" sx={{ color: "var(--textColor)" }}>
              {response}
            </Typography>
          )}
        </Box>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={8}>
          <TextField
  fullWidth
  label="Prompt"
  variant="outlined"
  value={prompt}
  onChange={handlePromptChange}
  sx={{
    "& label": {
      color: "var(--textColor)",
    },
    "& .MuiOutlinedInput-root": {
      borderColor: "var(--highlight)", // Set your desired outline color here
      "&:hover fieldset": {
        borderColor: "var(--highlight)", // Change the color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--highlight)", // Change the color on focus
            },
             }, 
             "& .Mui-focused": {
              color: "var(--highlight)", // Change the color of the label on focus
            },
             }}
          />
          </Grid>
          <Grid item xs={12} sm={4}>
            <button onClick={handleSubmit} style={{ color: "var(--textColor)" }}>
              Submit
            </button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default ChatBoxCard;
