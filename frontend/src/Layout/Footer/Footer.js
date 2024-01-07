import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      height={{ md: 50, xs: 150 }}
      bgcolor="#242b2e"
      component="footer"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "flex-start" }}
      justifyContent="space-between"
      p={2}
      mt={5}
    >
      <Typography color="whitesmoke" margin={{ xs: "0", md: "0 20px 0 0" }}>
        Made by Subham Kumar Chauhan
      </Typography>
      <Typography color="whitesmoke" m="0 0 10px 0">
        Contact: subhamchauhan982@gmail.com
      </Typography>
      <Typography color="whitesmoke" m="0">
        Follow me:{" "}
        <Link
          to="https://linkedin.com/in/subham-kr-chauhan"
          style={{ marginRight: 10 }}
          target="_blank"
        >
          <LinkedInIcon />
        </Link>
        <Link to="https://github.com/Subham-hub" target="_blank">
          <GitHubIcon />
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
