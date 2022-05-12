import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CategoryUpdate() {
  const { id } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/category/" + id)
      .then((response) => response.json())
      .then((result) => {
        setCategoryName(result["data"]["categoryName"]);
        setImageUrl(result["data"]["imageUrl"]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categorySubmit = {
      categoryId: id,
      categoryName,
      imageUrl,
    };

    fetch("http://localhost:8080/category/update", {
      method: "PATCH",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(categorySubmit),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result["description"]);
        if (result["code"] === "200") {
          window.location.href = "/category/";
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom component="div">
          UPDATE CATEGORY
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
                value={categoryName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="imageUrl"
                label="Image Url"
                variant="outlined"
                fullWidth
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Update
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
