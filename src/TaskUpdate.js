import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function TaskUpdate() {
  const { id } = useParams();

  const [taskName, setTaskName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState(1);

  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    getTaskId();
    getAllCategory();
  }, []);

  const getTaskId = () => {
    fetch("http://localhost:8080/task/" + id)
      .then((response) => response.json())
      .then((result) => {
        setTaskName(result["data"]["taskName"]);
        setCategoryID(result["data"]["categoryID"]);
        setStartDate(result["data"]["startDate"]);
        setDueDate(result["data"]["dueDate"]);
        setNote(result["data"]["note"]);
        setStatus(result["data"]["status"]);
      });
  };

  const getAllCategory = () => {
    fetch("http://localhost:8080/getAllCategory/")
      .then((response) => response.json())
      .then((result) => {
        setCategorys(result);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskSubmit = {
      taskId: id,
      taskName,
      categoryID,
      startDate,
      dueDate,
      note,
      status,
    };

    fetch("http://localhost:8080/task/update", {
      method: "PATCH",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(taskSubmit),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result["description"]);
        if (result["code"] === "200") {
          window.location.href = "/";
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom component="div">
          UPDATE TASK
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="taskname"
                label="Task Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setTaskName(e.target.value)}
                value={taskName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue="2022-04-01"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Due Date"
                type="date"
                defaultValue="2022-04-10"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="note"
                label="Note"
                variant="outlined"
                fullWidth
                onChange={(e) => setNote(e.target.value)}
                value={note}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="status-lable">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                fullWidth
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <MenuItem value={1}>Completed</MenuItem>
                <MenuItem value={2}>Doing</MenuItem>
                <MenuItem value={3}>Not Started</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="category-lable">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                fullWidth
                onChange={(e) => setCategoryID(e.target.value)}
                value={categoryID}
              >
                {categorys.map((data) => (
                  <MenuItem key={data.categoryId} value={data.categoryId}>
                    {data.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                update
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
