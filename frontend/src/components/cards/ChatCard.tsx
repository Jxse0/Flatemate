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
    setResponse("Amigo is thinking....");

    const response = await axios({
      method: "post",
      url: "http://localhost:3001/gpt",
      data: { message: prompt },
    });

    setResponse(response.data.message);
  };

  return (
    <Card sx={{ height: 300, display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          Ask Amigo
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
            <Typography variant="body1" component="p">
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
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default ChatBoxCard;
