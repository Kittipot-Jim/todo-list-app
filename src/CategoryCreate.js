import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CategoryCreate() {
  const [categoryName, setCategoryName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const categorySubmit = { categoryName, imageUrl };

    fetch("http://localhost:8080/category/create", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(categorySubmit),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result["description"]);
        if (result["code"] === "200") {
          window.location.href = "/category";
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom component="div">
          CREATE CATEGORY
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="categoryName"
                label="Category Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="imageUrl"
                label="Image Url"
                variant="outlined"
                fullWidth
                onChange={(e) => setImageUrl(e.target.value)}
              />
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
