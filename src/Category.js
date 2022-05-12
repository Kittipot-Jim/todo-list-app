import React, { useState, useEffect } from "react";
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
import ButtonGroup from "@mui/material/ButtonGroup";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

export default function Category() {
  const [categorys, setCategorys] = useState([]);

  const [open, setOpen] = useState(false);
  const [categoryIdDelete, setCategoryIdDelete] = useState("");

  useEffect(() => {
    categoryGet();
  }, []);

  const categoryGet = () => {
    fetch("http://localhost:8080/getAllCategory/")
      .then((response) => response.json())
      .then((result) => {
        setCategorys(result);
      });
  };

  const categoryUpdate = (categoryId) => {
    window.location = "/categoryUpdate/" + categoryId;
  };

  const handleClickOpen = (categoryId) => {
    setOpen(true);
    setCategoryIdDelete(categoryId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categoryDelete = ({ categoryIdDelete }) => {
    const categoryDel = {
      categoryId: categoryIdDelete,
    };

    fetch("http://localhost:8080/category/delete", {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(categoryDel),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result["code"] === "200") {
          categoryGet();
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

      {/* Categorys Table */}
      <Container maxWidth="md" sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <Box>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h5"
              gutterBottom
              component="div"
            >
              Categorys
            </Typography>
          </Box>
          <Box>
            <Link href="/categoryCreate">
              <Button variant="contained">Create Category</Button>
            </Link>
          </Box>
        </Box>
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Category Name</TableCell>
                  <TableCell align="left">Icon</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categorys.map((row) => (
                  <TableRow
                    key={row.categoryId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div style={{ width: "200px", wordBreak: "break-word" }}>
                        {row.categoryName}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <Avatar alt="category" src={row.imageUrl} />
                    </TableCell>
                    <TableCell align="right">
                      <ButtonGroup aria-label="button group">
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="edit"
                            onClick={() => categoryUpdate(row.categoryId)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleClickOpen(row.categoryId)}
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
            <Button
              onClick={() => categoryDelete({ categoryIdDelete })}
              autoFocus
            >
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
