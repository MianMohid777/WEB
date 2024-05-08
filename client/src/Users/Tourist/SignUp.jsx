import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useGoogleSignInMutation,
  useLoginMutation,
} from "../../services/Login/loginAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import Loader from "../../Utils/Loader";
import { addAuthUser } from "../../Redux/Features/userSlice";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";

import Rectangle from "../../Assets/tourist-login.jpg";
import mahal from "../../Assets/mahal.svg";
import emailSvg from "../../Assets/email.svg";
import lock from "../../Assets/lock.svg";
import plane from "../../Assets/plane.svg";
import google from "../../Assets/google.svg";
import tower from "../../Assets/tower.svg";
import google2 from "../../Assets/google-hover.svg";

function SignUp() {
  const { setItem, getItem } = useLocalStorage("access_token");
  const accessToken = getItem();

  const [googleSignIn, { isLoading: googleLoading }] =
    useGoogleSignInMutation();
  const [gsi, setGsi] = useState(false);

  useEffect(() => {
    const checkLogIn = async () => {
      try {
        const res = await login({ accessToken: accessToken }).unwrap();
        console.log(res);
        if (res) {
          dispatch(
            addAuthUser({
              email: res.email,
              id: res.id,
              name: res.name,
              access_token: accessToken,
            })
          );
          navigate("/home");
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkLogIn();
  }, []);

  const [svg, setSvg] = useState(google);

  const handleMouseOver = () => {
    svg === google ? setSvg(google2) : setSvg(google);
  };
  const handleMouseOut = () => {
    svg === google2 ? setSvg(google) : setSvg(google2);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const theme = createTheme({
    typography: {
      fontFamily: "'Space Grotesk', sans-serif",
    },
  });

  if (isLoading) return <Loader />;

  const handleSubmit = async () => {
    if (!email.includes("@") || email.length === 0) {
      setError((prevError) => ({
        ...prevError,
        emailError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        emailError: false,
      }));
    }

    if (password.length === 0) {
      setError((prevError) => ({
        ...prevError,
        passwordError: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        passwordError: false,
      }));
    }
    try {
      if (!error.emailError && !error.passwordError) {
        const response = await login({
          emailAddress: email,
          password: password,
        }).unwrap();

        dispatch(
          addAuthUser({
            email: email,
            id: response.id,
            name: response.name,
            access_token: response.accessToken,
            refresh_token: response.refreshToken,
          })
        );

        setItem(response.accessToken);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const gsi_url = await googleSignIn().unwrap();

      if (gsi_url) {
        window.location.href = gsi_url.url;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <Box
                component="img"
                src={Rectangle}
                alt=""
                style={{
                  width: "100%",
                  height: "100vh",
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            container
            display="flex"
            direction="column"
            alignItems="center"
          >
            <Box
              component="div"
              sx={{ position: "relative", top: "70px", left: "240px" }}
            >
              <Box component="img" src={plane} alt="" />
            </Box>
            <Box component="div" sx={{ textAlign: "center", mt: 4 }}>
              <Box
                sx={{
                  fontSize: "72px",
                  color: "#00a651",
                  fontWeight: "bolder",
                }}
              >
                Welcome
              </Box>
              <Box
                sx={{
                  fontSize: "16px",
                  color: "#00000083",
                  fontWeight: "normal",
                }}
              >
                Sign Up with your email
              </Box>
            </Box>

            <Box
              compomnent="div"
              sx={{ display: "flex", flexDirection: "column", mt: 3 }}
            >
              <Box
                compomnent="div"
                sx={{ display: "flex", flexDirection: "row", mt: 1 }}
              >
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  required
                  error={error.emailError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={emailSvg} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  color="success"
                  sx={{ width: "30ch", marginRight: "3ch" }}
                  focused
                  onChange={handleEmailChange}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  required
                  error={error.emailError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={emailSvg} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  color="success"
                  sx={{ width: "30ch" }}
                  focused
                  onChange={handleEmailChange}
                />
              </Box>
              <Box
                compomnent="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mt: 1,
                  justifyContent: "center",
                }}
              >
                <TextField
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  required
                  error={error.emailError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={emailSvg} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  color="success"
                  sx={{ width: "40ch" }}
                  focused
                  onChange={handleEmailChange}
                />
              </Box>
              <Box
                compomnent="div"
                sx={{ display: "flex", flexDirection: "row", mt: 2 }}
              >
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  error={error.passwordError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={lock} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  color="success"
                  sx={{ width: "30ch", marginRight: "3ch" }}
                  focused
                  onChange={handlePasswordChange}
                />
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  required
                  error={error.passwordError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={lock} alt="" />
                      </InputAdornment>
                    ),
                  }}
                  margin="dense"
                  color="success"
                  sx={{ width: "30ch" }}
                  focused
                  onChange={handlePasswordChange}
                />
              </Box>
            </Box>

            <Button
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                bgcolor: "#00a651",
                width: "125px",
                height: "48px",
              }}
              onClick={handleSubmit}
            >
              SIGN UP
            </Button>

            <Box sx={{ display: "flex", color: "#848383", gap: "5px", mt: 2 }}>
              <Box component="div">
                <Divider sx={{ width: "100px", color: "#CCCCCC", mt: 1 }} />
              </Box>

              <Box
                sx={{
                  fontSize: "14px",
                  color: "#000000",
                  fontWeight: "normal",
                }}
              >
                OR
              </Box>

              <Box component="div">
                <Divider sx={{ width: "100px", color: "#CCCCCC", mt: 1 }} />
              </Box>
            </Box>

            <Box component="div">
              <Box
                component="img"
                src={svg}
                alt=""
                sx={{ mt: 2 }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
            </Box>

            <Box
              component="div"
              sx={{
                mt: 1,
                fontSize: "14px",
                color: "#000000",
                fontWeight: "normal",
              }}
            >
              Already have an account?
              <Box
                component="span"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#009ee2",
                  },
                }}
                onClick={() => navigate("/tourist-login")}
              >
                {" "}
                Login Now
              </Box>
            </Box>

            <Box
              component="Box"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",

                marginTop: "10ch",
              }}
            >
              <Box
                component="img"
                marginLeft={"7px"}
                src={mahal}
                alt=""
                sx={{}}
              />
              <Box
                component="img"
                marginRight={"7px"}
                src={tower}
                alt=""
                sx={{}}
              />
            </Box>
          </Grid>
        </Grid>
      </Typography>
    </ThemeProvider>
  );
}

export default SignUp;
