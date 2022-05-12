import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
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
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

export default function Checklist() {
  const { id } = useParams();

  const [checklists, setChecklists] = useState([]);

  const [open, setOpen] = useState(false);
  const [todoIdDelete, setTodoIdDelete] = useState("");

  const handleClickOpen = (todoId) => {
    setOpen(true);
    setTodoIdDelete(todoId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    checklistGet();
  }, []);

  const checklistGet = () => {
    fetch("http://localhost:8080/getAllChecklist2/" + id)
      .then((response) => response.json())
      .then((result) => {
        setChecklists(result);
      });
  };

  const checklistCreate = ({ id }) => {
    window.location = "/checklistCreate/" + id;
  };

  const checklistUpdate = (todoId) => {
    window.location = "/checklistUpdate/" + todoId;
  };

  const checklistDelete = ({ todoIdDelete }) => {
    const taskDel = {
      todoId: todoIdDelete,
    };

    fetch("http://localhost:8080/checklist/delete", {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(taskDel),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["code"] === "200") {
          checklistGet();
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

      {/* Checklist Table */}
      <Container maxWidth="md" sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <Box>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h5"
              gutterBottom
              component="div"
            >
              Checklists
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" onClick={() => checklistCreate({ id })}>
              Create Checklist
            </Button>
          </Box>
        </Box>
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Todo Name</TableCell>
                  <TableCell align="left">Is Completed</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checklists.map((row) => (
                  <TableRow
                    key={row.todoId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {row.isCompleted === true && (
                      <TableCell component="th" scope="row" align="left">
                        <div
                          style={{
                            width: "300px",
                            wordBreak: "break-word",
                          }}
                        >
                          <del>{row.todoName}</del>
                        </div>
                      </TableCell>
                    )}
                    {row.isCompleted === false && (
                      <TableCell align="left">
                        <div
                          style={{
                            width: "220px",
                            wordBreak: "break-word",
                          }}
                        >
                          {row.todoName}
                        </div>
                      </TableCell>
                    )}
                    {row.isCompleted === true && (
                      <TableCell align="left">Completed</TableCell>
                    )}
                    {row.isCompleted === false && (
                      <TableCell align="left">Not Completed</TableCell>
                    )}
                    <TableCell align="right">
                      <ButtonGroup aria-label="button group">
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="edit"
                            onClick={() => checklistUpdate(row.todoId)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleClickOpen(row.todoId)}
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
            <Button onClick={() => checklistDelete({ todoIdDelete })} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Button sx={{ m: 2 }} variant="text" href="/">
          Return Home
        </Button>
      </Container>
    </React.Fragment>
  );
}
