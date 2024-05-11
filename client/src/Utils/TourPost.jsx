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
import DP from "../Assets/Karakoram.jpg";
function TourPost(props) {
  //THEME
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
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
        width: "30%",

        overflow: "hidden",
        boxShadow:
          "0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 25px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "30px",
        backgroundColor: "#FF4E45",
        color: "white",
        transition: " 0.5s ease-in",

        "&:hover": {
          overflow: "auto",
          scale: "1.1",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            fontSize: "18px",
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
            sx={{ width: "100%", height: "20%", mt: 1, borderRadius: "20px" }}
            image={props.img}
            alt="Cover Photo"
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
          <Divider component="div" />
          <Box component="div" mt={1}>
            <Box component="span" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Max Slots:
            </Box>{" "}
            {props.slots}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TourPost;
