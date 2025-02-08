import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const Paragraph = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, setText] = useState("");
  const [para, setPara] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/openai/paragraph", { text });
      console.log(data);
      setPara(data.paragraph || "No paragraph generated.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "Something went wrong.");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Generate Paragraph</Typography>

        <TextField
          placeholder="Enter your text..."
          type="text"
          multiline
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button type="submit" fullWidth variant="contained" size="large" sx={{ color: "white", mt: 2 }}>
          Generate
        </Button>
        <Typography mt={2}>
          Not this tool? <Link to="/">Go Back</Link>
        </Typography>
      </form>

      <Card
        sx={{
          mt: 4,
          border: 1,
          boxShadow: 0,
          height: "500px",
          borderRadius: 5,
          borderColor: "natural.medium",
          bgcolor: "background.default",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {para || "Your Paragraph Will Appear Here"}
        </Typography>
      </Card>
    </Box>
  );
};

export default Paragraph;
