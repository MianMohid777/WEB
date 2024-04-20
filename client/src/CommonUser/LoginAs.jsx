import React from "react";
import Grid from '@mui/material/Grid';
import { Container, display, maxWidth } from "@mui/system";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function LoginAsGroup() {
    return (
        <div style={{  }}>
            <ButtonGroup
                sx={{
                    width: '550px',
                    height: "400px",
                    padding: '15px',
                    margin: "5px",
                    backgroundColor: 'rgb(21, 101, 192, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent:"space-evenly",
                 
                    '& .MuiButton-root': {
                        justifyContent: 'space-between',
                        width: '100%',
                        borderRadius: 0
                    },
                    '& .MuiButton-endIcon': {
                        marginLeft: 'auto',
                        fontSize: '40%', 
                        width: "30px"
                    }
                }}
                orientation="vertical"
                aria-label="Vertical button group"
                variant="contained"
            >
                <Button sx={{ marginTop: "3%", marginBottom: "3%", height:"100%", fontSize:"18px" }} endIcon={<ArrowForwardIcon />}>
                    Login as Tourist
                </Button>
                <Button sx={{ marginTop: "3%", marginBottom: "3%",height:"100%" ,fontSize:"18px"}} endIcon={<ArrowForwardIcon />}>
                    Login as Tour Company
                </Button>
                <Button sx={{ marginTop: "3%", marginBottom: "3%",height:"100%", fontSize:"18px" }} endIcon={<ArrowForwardIcon />}>
                    Login as Tour Guide
                </Button>
            </ButtonGroup>
        </div>
    );
}

function ChooseLogin() {
    return (
        <Grid container sx={{
            minHeight: '100vh'
        }}>
            <Grid item xs={12} sm={6}>
                <img
                    src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg5MTQ0MTctaW1hZ2Uta3d2eGNidHYuanBn.jpg"
                    style={{
                        width: "100%",
                        height: "100vh",
                        objectFit: "cover"
                    }}
                    alt="Travel Login"
                />

            </Grid>
            <Grid container item xs={12} sm={6} alignItems={"center"} direction={"column"} justifyContent={"space-between"}
                sx={{
                    padding: 10
                }}>

                <div />

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: "80%",
                    minWidth: "0%"
                }}>
                    <Grid container justify="center" >
                        <img
                            src=""
                            alt="logo"
                        />
                    </Grid>
                    <LoginAsGroup></LoginAsGroup>
                    <hr></hr>
                    <Button sx={{width:"100%"}}>Interested in Joining?</Button>
                
                </div>
                
                <div/>
            </Grid>

        </Grid>

    )
};

export default ChooseLogin;
