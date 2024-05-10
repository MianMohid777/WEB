import React, { useState } from "react";

import {
  Box,
  Button,
  Divider,
  ThemeProvider,
  Typography,
  createTheme,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardActionArea,
  CardMedia,
} from "@mui/material";
function TourPost(props) {
  //THEME
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "1rem",
      fontWeight: "bolder",
    },
  });
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        height: "80%",
        boxShadow:
          "0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 25px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "30px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            fontSize: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardHeader title={props.locationName + " Tour"} mt={1} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "", mt: 1 }}
            image={props.img}
          />
        </Box>
        <Box sx={{ fontSize: "12px" }}>
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Tourism Agency:{" "}
            </Box>{" "}
            {props.agencyName}
          </Box>
          <Divider component="div" />
          <Box
            component="div"
            mt={2}
            sx={{ fontSize: "20px", fontWeight: "900" }}
          >
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Destination:{" "}
            </Box>{" "}
            {props.locationName}
          </Box>
          <Divider component="div" />
          <Box component="div" mt={1} sx={{ overflow: "auto" }}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              About Tour:{" "}
            </Box>{" "}
            {props.info}
          </Box>
          <Divider component="div" />
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Start Date:
            </Box>{" "}
            {props.startDate}
          </Box>

          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              End Date:
            </Box>{" "}
            {props.endDate}
          </Box>
          <Divider component="div" />
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Price:
            </Box>{" "}
            {props.price}
          </Box>
          <Divider component="div" />
        </Box>
      </CardContent>
    </Card>
  );
}

export default TourPost;
