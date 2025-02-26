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

const JsConverter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/openai/js-converter",
        { text }
      );
      console.log(data);
      setCode(
        typeof data.javascriptCode === "string"
          ? data.javascriptCode
          : JSON.stringify(data.javascriptCode) || "No code generated."
      );    } catch (err) {
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
        <Typography variant="h3">JS Converter</Typography>

        <TextField
          placeholder="Enter your instructions..."
          type="text"
          multiline
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Convert
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
          overflow: "auto",
          p: 2,
        }}
      >
        <pre>
          <pre>
            <Typography component="code">
              {code || "Your Code Will Appear Here"}
            </Typography>
          </pre>
        </pre>
      </Card>
    </Box>
  );
};

export default JsConverter;
