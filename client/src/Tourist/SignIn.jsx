import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useState, useEffect } from "react";

import React from "react";
import Rectangle from "../assets/Rectangle.svg";
import mahal from "../assets/mahal.svg";
import email from "../assets/email.svg";
import lock from "../assets/lock.svg";
import plane from "../assets/plane.svg";
import google from "../assets/google.svg";
import tower from "../assets/tower.svg";
import google2 from "../assets/google-hover.svg";
import "../Styles/signUp.scss";

function SignIn() {
  const [svg, setSvg] = useState(google);

  const handleMouseOver = () => {
    svg === google ? setSvg(google2) : setSvg(google);
  };
  const handleMouseOut = () => {
    svg === google2 ? setSvg(google) : setSvg(google2);
  };

  return (
    <>
      <Grid container className="main">
        <Grid item xs={12} md={12} lg={6}>
          <div>
            <img
              src={Rectangle}
              alt=""
              style={{
                overflow: "hidden",
                width: "100%",
                height: "auto",
              }}
            ></img>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          display="flex"
          direction="column"
          alignItems="center"
        >
          <div className="plane">
            <img src={plane} alt=""></img>
          </div>
          <div className="sec1">
            <div className="welcome">Welcome</div>
            <div className="txt">Login with your email</div>
          </div>

          <div className="textField">
            <TextField
              id="email"
              label="Email Id"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={email} alt="" />
                  </InputAdornment>
                ),
              }}
              margin="dense"
              color="primary"
              sx={{ width: "40ch" }}
              focused
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={lock} alt="" />
                  </InputAdornment>
                ),
              }}
              margin="dense"
              color="primary"
              sx={{ mt: 5, width: "40ch" }}
              focused
            />
          </div>

          <div className="forgot">Forgot your password?</div>

          <Button
            variant="contained"
            sx={{ mt: 6, bgcolor: "#009ee2", width: "125px", height: "48px" }}
          >
            LOGIN
          </Button>

          <div className="sec2">
            <div style={{ width: "100px" }}>
              <hr style={{ color: "#CCCCCC" }} />
            </div>
            <div className="txt2">OR</div>
            <div style={{ width: "100px" }}>
              <hr style={{ color: "#CCCCCC" }} />
            </div>
          </div>

          <div>
            <img
              src={svg}
              alt=""
              className="google"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            />
          </div>

          <div className="account">
            Don't have account?
            <span className="register"> Register Now</span>
          </div>

          <div>
            <img src={mahal} alt="" className="mahal" />
            <img src={tower} alt="" className="tower" />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default SignIn;
