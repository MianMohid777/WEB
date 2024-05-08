import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import AgencyHeader from "./AgencyHeader.jsx";


import Loader from "../../Utils/Loader";
import { useTourPublishMutation } from "../../Services/Agency/publishTour.js";

// Create the custom theme
const theme = createTheme({
  typography: {
    fontFamily: "'Space Grotesk', sans-serif",
  },
});

const CreateTour = () => {
  console.log("Opened create Tour page")

  // State variables to store form data
  const [agencyName, setAgencyName] = useState("Amazing Adventure")
  const [locationName, setLocationName] = useState("");
  const [locationImage, setLocationImage] = useState("image");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [registrationEndDate, setRegistrationEndDate] = useState(new Date());
  const [information, setInformation] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);

  const [tourPublish, { isLoading }] = useTourPublishMutation();

  const [tourInfo, setTourInfo] = useState({
    tourAgencyName: "Amazing Adventure",
    tourLocationName: "",
    tourLocationImage: "image",
    tourStartDate: new Date().toLocaleDateString(),
    tourEndDate: new Date().toLocaleDateString(),
    tourRegistrationEndDate: new Date().toLocaleDateString(),
    tourInformation: "",
    tourPrice: 0.0,
    tourStatus: "Upcoming"

  })




  if (isLoading) return <Loader />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAgencyName("Amazing Adventures")
    const newTourInfo = {
      tourAgencyName: "Amazing Adventures",

      tourLocationName: locationName,
      tourLocationImage: locationImage,
      tourStartDate: startDate,
      tourEndDate: endDate,
      tourRegistrationEndDate: registrationEndDate,
      tourInformation: information,
      tourStatus: status,
      tourPrice: price
    };

    console.log("TOUR INFO", newTourInfo);
    setTourInfo(tourInfo)


    const response = await tourPublish(newTourInfo).unwrap();

    console.log("RESPONSE", response);

  };

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLocationImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography>
        <AgencyHeader />
        <Box
          maxWidth={800}
          mx="auto"
          mt={4}
          p={3}
          boxShadow={3}
          borderRadius={8}
          bgcolor="white"
        >
          <Typography variant="h4" gutterBottom>
            Create Tour
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Location Name"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Upload Image
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Registration End Date"
                  type="date"
                  value={registrationEndDate}
                  onChange={(e) => setRegistrationEndDate(e.target.value)}
                  fullWidth
                  //required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                    <MenuItem value="RegistrationsOpened">Registrations Open</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Information"
                  multiline
                  rows={4}
                  value={information}
                  onChange={(e) => setInformation(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Ticket Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                  Create Tour
                </Button>
              </Grid>
            </Grid>

          </form>
        </Box>
      </Typography>
    </ThemeProvider>
  );
};

export default CreateTour;
