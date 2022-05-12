import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Tooltip from "@mui/material/Tooltip";

export default function Task() {
  const [tasks, setTasks] = useState([]);

  const [open, setOpen] = useState(false);
  const [taskIdDelete, setTaskIdDelete] = useState("");

  useEffect(() => {
    taskGet();
  }, []);

  const taskGet = () => {
    fetch("http://localhost:8080/getAll2")
      .then((response) => response.json())
      .then((result) => {
        setTasks(result);
      });
  };

  const checklist = (taskId) => {
    window.location = "/checklist/" + taskId;
  };

  const taskUpdate = (taskId) => {
    window.location = "/update/" + taskId;
  };

  const handleClickOpen = (taskId) => {
    setOpen(true);
    setTaskIdDelete(taskId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const taskDelete = ({ taskIdDelete }) => {
    const taskDel = {
      taskId: taskIdDelete,
    };

    fetch("http://localhost:8080/task/delete", {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(taskDel),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["code"] === "200") {
          taskGet();
          setOpen(false);
        } else {
          alert("Can't delete.");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Tasks Table */}
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <Box>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h5"
              gutterBottom
              component="div"
            >
              Task Lists
            </Typography>
          </Box>
          <Box>
            <Link href="create">
              <Button variant="contained">Create Task</Button>
            </Link>
          </Box>
        </Box>
        <Paper elevation={1}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Task Name</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">Due Date</TableCell>
                  <TableCell align="left">Note</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((row) => (
                  <TableRow
                    key={row.taskId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Avatar alt="category" src={row.imageUrl} />
                    </TableCell>
                    <TableCell align="left">
                      <div style={{ width: "150px", wordBreak: "break-word" }}>
                        {row.taskName}
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div style={{ width: "100px" }}>{row.startDate}</div>
                    </TableCell>
                    <TableCell align="left">
                      <div style={{ width: "100px" }}>{row.dueDate}</div>
                    </TableCell>
                    <TableCell align="left">
                      <div style={{ width: "150px", wordBreak: "break-word" }}>
                        {row.note}
                      </div>
                    </TableCell>
                    {row.status === 1 && (
                      <TableCell align="left">Completed</TableCell>
                    )}
                    {row.status === 2 && (
                      <TableCell align="left">Doing</TableCell>
                    )}
                    {row.status === 3 && (
                      <TableCell align="left">Not Started</TableCell>
                    )}
                    <TableCell align="right">
                      <ButtonGroup aria-label="button group">
                        <Tooltip title="Checklist">
                          <IconButton
                            color="primary"
                            aria-label="checklist"
                            onClick={() => checklist(row.taskId, row.taskName)}
                          >
                            <ListAltIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="edit"
                            onClick={() => taskUpdate(row.taskId)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleClickOpen(row.taskId)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Dialog delete */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Calcel</Button>
            <Button onClick={() => taskDelete({ taskIdDelete })} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </React.Fragment>
  );
}
