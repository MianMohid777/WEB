import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
function AgencyHome() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography>
          <Grid container>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <Box>
                <Box
                  component="img"
                  alt=""
                  style={{
                    width: "100%",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}></Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
          </Grid>
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default AgencyHome;
