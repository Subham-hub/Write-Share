import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import RightNavElements from "./components/RightNavElements";
import LeftNavElements from "./components/LeftNavElements";

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: "#242B2E" }}>
      <Container maxWidth="xl" sx={{ bgcolor: "#242B2E" }}>
        <Toolbar disableGutters>
          <LeftNavElements />
          <RightNavElements />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
