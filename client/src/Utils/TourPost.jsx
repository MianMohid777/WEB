import React, { useState } from "react";

import {
  Box,
  Divider,
  createTheme,
  Card,
  CardContent,
  CardHeader,
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
        boxShadow:
          "0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 25px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "30px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            fontSize: "28px",
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
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "300px", mt: 1 }}
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
          <Box
            component="div"
            mt={1}
            sx={{ maxHeight: "100px", overflow: "auto" }}
          >
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
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Status:
            </Box>{" "}
            {props.status}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TourPost;
