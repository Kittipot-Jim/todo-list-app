import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function ChecklistCreate() {
  const { id } = useParams();

  const [todoName, setTodoName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checklistSubmit = { todoName, taskId: id, isCompleted };

    fetch("http://localhost:8080/checklist/create", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(checklistSubmit),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result["description"]);
        if (result["code"] === "200") {
          window.location.href = "/checklist/" + id;
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom component="div">
          CREATE CHECKLIST
        </Typography>

        {/* Create Checklist */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="todoname"
                label="Todo Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setTodoName(e.target.value)}
                value={todoName}
              />
            </Grid>
            <Grid item xs={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCompleted}
                      onChange={(e) => setIsCompleted(e.target.checked)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={
                    (isCompleted === false && "Not Completed") ||
                    (isCompleted === true && "Completed")
                  }
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button sx={{ m: 2 }} variant="text" href="/">
          Return Home
        </Button>
      </Container>
    </React.Fragment>
  );
}
