import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#FFFFFF" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            ml: 5,
            mr: 5,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#1A76D2" }}
          >
            TO-DO LIST
          </Typography>
          <div className="nav-btn">
            <ul>
              <li>
                <a href="/">TASK</a>
              </li>
              <li>
                <a href="/category">CATEGORY</a>
              </li>
            </ul>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
