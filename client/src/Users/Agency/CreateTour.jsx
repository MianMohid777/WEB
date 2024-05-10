import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  AppBar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Drawer,
  ThemeProvider,
  Typography,
  createTheme,
  IconButton,
  InputBase,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";

import Menu from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import HistoryIcon from "@mui/icons-material/History";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import CreatePost from "@mui/icons-material/EditCalendar";
import { PhotoCamera } from "@mui/icons-material";
import AgencyHeader from './AgencyHeader.jsx';
import Loader from "../../Utils/Loader";
import { useTourPublishMutation } from "../../Services/Agency/publishTour.js";

import DP from "../../Assets/Karakoram.jpg";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook.js";


function CreateTour() {
  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
    palette: {
      mode: 'dark',
      primary: {
        main: "#FF4E45",
      },
      background: {
        default: "#282828", // Black background
      },
      text: {
        primary: "#FFF", // White text
      },
    },
  });

  // HOOKS
  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const navigate = useNavigate();
  const [color, setColor] = useState({
    dash: "#FF4E45",
    profile: "white",
    ads: "white",
    history: "white",
    stats: "white",
    settings: "white",
  });

  // State variables to store form data
  const [locationName, setLocationName] = useState("");
  const [locationImage, setLocationImage] = useState("image");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [registrationEndDate, setRegistrationEndDate] = useState(new Date());
  const [information, setInformation] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);

  const [tourPublish, { isLoading, isError }] = useTourPublishMutation();
  const agency = useSelector((state) => state.agency);
  console.log(agency);
  const { setItem, getItem } = useLocalStorage("access_token");
  const accessToken = getItem();


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


  console.log("Opened create Tour page")







  if (isLoading) return <Loader />;


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

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (index) => {
    setSelectedIdx(index);
  };




  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };


  if (isLoading) return <Loader />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidDate(startDate) || !isValidDate(endDate) || !isValidDate(registrationEndDate)) {
      alert('Please enter valid dates');
      return;
    }

    // Check if start date is after end date
    if (new Date(startDate) >= new Date(endDate)) {
      alert('Start date must be before end date');
      return;
    }

    // Check if registration end date is after end date
    if (new Date(registrationEndDate) > new Date(endDate)) {
      alert('Registration end date must be before or equal to end date');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      alert('Start date must be before end date');
      return;
    }

    // Check if registration end date is after end date
    if (new Date(registrationEndDate) > new Date(endDate)) {
      alert('Registration end date must be before or equal to end date');
      return;
    }

    const newTourInfo = {
      tourAgencyId: agency.authAgency.id,
      tourAgencyName: agency.authAgency.name,
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


    const payload = {
      tourInfo: newTourInfo,
      id: agency.authAgency.id,
      accessToken: accessToken,
    };
    console.log(payload);
    try {
      const response = await tourPublish(payload).unwrap();

      console.log("RESPONSE", response);
    } catch (e) {
      console.log(e);
    }
  };





  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography>
          <Grid container sx={{ backgroundColor: "#1F1F1F" }}>
            <Grid item lg={12}>
              <AppBar sx={{ bgcolor: "#23b3b3b", height: "10%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton sx={{ margin: "20px", borderRadius: "0px" }}>
                    <Menu
                      fontSize="medium"
                      sx={{ color: "#FFF" }}
                      onClick={() => setOpen(!open)}
                    />
                  </IconButton>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexBasis: "100%",
                      marginLeft: "1%",
                      
                    }}
                  >
                    <InputBase
                      sx={{
                        width: "60%",
                        fontSize: "16px",
                        fontWeight: "bold",
                        border: "1px solid #FFF",
                        color: "#FFF",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                      placeholder="Search Active Ads"
                      autoFocus={true}
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#FFF" }} />
                        </InputAdornment>
                      }
                    />
                  </Box>
                  <IconButton
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "50px",
                      color: "#FFF",
                      border: "1px solid #FFF",
                      borderRadius: "0px",
                      gap: "10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                  >
                    <CreatePost fontSize="large" sx={{ color: "#FF4E45" }} />
                    <Box component="div" fontSize={16} fontWeight={700}>
                      CREATE
                    </Box>
                  </IconButton>
                </Box>
              </AppBar>

              {/* Drawer */}
              <Drawer
                open={open}
                sx={{
                  boxSizing: "border-box",

                  "& .MuiDrawer-paper": {
                    width: "20%",
                    boxSizing: "border-box",
                    backgroundColor: "#282828",
                    color: "#FF4E45",
                  },
                }}
                variant="temporary"
                anchor="left"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    ml: "auto",
                    mt: 1,
                    mr: 2,
                    cursor: "pointer",
                  
                  }}
                  onClick={() => setOpen(!open)}
                >
                  <CloseIcon sx={{ color: "white" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 0.5,
                    mt: 3,
                    
                  }}
                >
                  <Divider />
                  <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                      <ListItemButton
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "black",
                            "&:hover": {
                              backgroundColor: "black",
                            },
                            color: "#FF4E45",
                          },
                          "&:hover": {
                            backgroundColor: "black",
                          },
                          color: "white",
                        }}
                        selected={selectedIdx === 0}
                        onClick={() => {
                          handleItemClick(0);
                          setColor((prevColor) => ({
                            ...prevColor,
                            dash: "#FF4E45",
                          }));
                        }}
                        onBlur={() => {
                          setColor((prevColor) => ({
                            ...prevColor,
                            dash: "white",
                          }));
                        }}
                      >
                        <ListItemIcon>
                          <DashboardIcon sx={{ color: color.dash }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"></ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>

                  <Divider />
                  <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                      <ListItemButton
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "black",
                            "&:hover": {
                              backgroundColor: "black",
                            },
                            color: "#FF4E45",
                          },
                          "&:hover": {
                            backgroundColor: "black",
                          },
                          color: "white",
                        }}
                        selected={selectedIdx === 1}
                        onClick={() => {
                          handleItemClick(1);
                          setColor((prevColor) => ({
                            ...prevColor,
                            profile: "#FF4E45",
                          }));
                        }}
                        onBlur={() => {
                          setColor((prevColor) => ({
                            ...prevColor,
                            profile: "white",
                          }));
                        }}
                      >
                        <ListItemIcon>
                          <StoreIcon sx={{ color: color.profile }} />
                        </ListItemIcon>

                        <ListItemText primary="Agency Profile"></ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>

                  <Divider />
                  <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                      <ListItemButton
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "black",
                            "&:hover": {
                              backgroundColor: "black",
                            },
                            color: "#FF4E45",
                          },
                          "&:hover": {
                            backgroundColor: "black",
                          },
                          color: "white",
                        }}
                        selected={selectedIdx === 2}
                        onClick={() => {
                          handleItemClick(2);
                          setColor((prevColor) => ({
                            ...prevColor,
                            ads: "#FF4E45",
                          }));
                        }}
                        onBlur={() => {
                          setColor((prevColor) => ({
                            ...prevColor,
                            ads: "white",
                          }));
                        }}
                      >
                        <ListItemIcon>
                          <DynamicFeedIcon sx={{ color: color.ads }} />
                        </ListItemIcon>
                        <ListItemText primary="Active Ads"></ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>

                  <Divider />
                  <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                      <ListItemButton
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "black",
                            "&:hover": {
                              backgroundColor: "black",
                            },
                            color: "#FF4E45",
                          },
                          "&:hover": {
                            backgroundColor: "black",
                          },
                          color: "white",
                        }}
                        selected={selectedIdx === 3}
                        onClick={() => {
                          handleItemClick(3);
                          setColor((prevColor) => ({
                            ...prevColor,
                            history: "#FF4E45",
                          }));
                        }}
                        onBlur={() => {
                          setColor((prevColor) => ({
                            ...prevColor,
                            history: "white",
                          }));
                        }}
                      >
                        <ListItemIcon>
                          <HistoryIcon sx={{ color: color.history }} />
                        </ListItemIcon>
                        <ListItemText primary="Ads History"></ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>

                  <Divider />
                  <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                      <ListItemButton
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "black",
                            "&:hover": {
                              backgroundColor: "black",
                            },
                            color: "#FF4E45",
                          },
                          "&:hover": {
                            backgroundColor: "black",
                          },
                          color: "white",
                        }}
                        selected={selectedIdx === 4}
                        onClick={() => {
                          handleItemClick(4);
                          setColor((prevColor) => ({
                            ...prevColor,
                            stats: "#FF4E45",
                          }));
                        }}
                        onBlur={() => {
                          setColor((prevColor) => ({
                            ...prevColor,
                            stats: "white",
                          }));
                        }}
                      >
                        <ListItemIcon>
                          <QueryStatsIcon sx={{ color: color.stats }} />
                        </ListItemIcon>
                        <ListItemText primary="Analytics"></ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>

                  <Divider />
                  <List sx={{ width: "100%" }}>
                    <ListItem sx={{ padding: "0" }}>
                      <ListItemButton
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "black",
                            "&:hover": {
                              backgroundColor: "black",
                            },
                            color: "#FF4E45",
                          },
                          "&:hover": {
                            backgroundColor: "black",
                          },
                          color: "white",
                        }}
                        selected={selectedIdx === 5}
                        onClick={() => {
                          handleItemClick(5);
                          setColor((prevColor) => ({
                            ...prevColor,
                            settings: "#FF4E45",
                          }));
                        }}
                        onBlur={() => {
                          setColor((prevColor) => ({
                            ...prevColor,
                            settings: "white",
                          }));
                        }}
                      >
                        <ListItemIcon>
                          <SettingsIcon sx={{ color: color.settings }} />
                        </ListItemIcon>
                        <ListItemText primary="Settings"></ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </Grid>


            <Grid container spacing={3} padding={8} margin={8} sx={{ justifyContent: "center", alignItems: "center", height: "100%", backgroundColor: "#282828" }}>
              <Typography variant="h4" gutterBottom color={"#FFF"}>
                Create Tour
              </Typography>
              <hr></hr>
              <Typography variant="p" gutterBottom color={"#FFF"}> 
                {agency.authAgency.name}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3} adding={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Location Name"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      fullWidth
                      required
                      sx={{ color: "#FFF" }} // White text
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
                        sx={{ color: "#FFF" }} // White text
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
                      sx={{ color: "#FFF" }}
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
                      sx={{ color: "#FFF" }}
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
                      sx={{ color: "#FFF" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel sx={{ color: "#FFF" }}>Status</InputLabel> 
                      <Select value={status} onChange={(e) => setStatus(e.target.value)}>
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
                      sx={{ color: "#FFF" }}
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
                      sx={{ color: "#FFF" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Create Tour
                    </Button>
                  </Grid>
                </Grid>

              </form>
            </Grid>
          </Grid>
        </Typography>
      </ThemeProvider>
    </>
  );
};


export default CreateTour;
