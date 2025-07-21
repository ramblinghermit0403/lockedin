import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const HeroBanner = () => {
  return (
    <Box
      sx={{
        marginLeft: "1rem",
        width: "100%",
        // backgroundColor: "#f9fafb",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: 700,
          lineHeight: "1.2",
          marginTop: "2rem",
          marginBottom: "1rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          borderRight: "2px solid black",
          width: "fit-content",
          animation: "typing 3s steps(30, end), blink 0.75s step-end infinite",
        }}
      >
        Track. Train. Transform. Win.
      </h1>

      <Typography
        sx={{
          fontSize: "18px",
          lineHeight: 1.7,
          maxWidth: "100vw",
          mt: 2,
          color: "#64748b",
        }}
      >
        Your personalized fitness companion. Built to keep you focused,
        consistent, and progressing — every single day.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="../pages/features"
        sx={{ mt: 3, textTransform: "none", fontWeight: 600 }}
      >
        Explore Features
      </Button>
    </Box>
  );
};

export default HeroBanner;
