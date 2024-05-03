import React from "react";

import {
  Box,
  Button,
  Divider,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import error from "../Assets/error.svg";
function ToastMessage(props) {
  //THEME
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 14,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Typography>
        <Box
          component="div"
          sx={{
            backgroundColor: "#EB5757",
            minWidth: "300px",
            maxWidth: "300px",
            color: "white",
            padding: "15px",
            borderRadius: "2px",
            fontWeight: 700,
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <Box component="div" display="flex" gap="5px">
              <Box component="img" src={error} />
              <Box component="div" sx={{ fontSize: "18px" }}>
                Error !
              </Box>
              <Box
                component="div"
                sx={{
                  marginLeft: "65%",
                  fontSize: "18px",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  props.setToast(false);
                }}
              >
                x
              </Box>
            </Box>
            <Box component="div">{props.message}</Box>
          </Box>
        </Box>
      </Typography>
    </ThemeProvider>
  );
}

export default ToastMessage;
