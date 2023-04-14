import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Button from '@mui/material/Button';

function Navigation() {

    const location = useLocation();
    const navigate = useNavigate();
    return(
        <AppBar position="static" sx={{backgroundColor: '#c8cbad'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <DirectionsCarIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}>
                    </DirectionsCarIcon>
                     <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 3,
                            display: { xs: 'none', md: 'flex' },
                            paddingLeft: "30px",
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            letterSpacing: '.3rem',
                            color: '#896c63',
                            textDecoration: 'none',
                        }}
                    >
                    Safe and sound
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "flex-end"},
                        alignItems: "center",
                    }}>
                        {( location.pathname === "/home" || location.pathname === "/" || location.pathname === "/signin" || location.pathname === "/register" ) ? (
                        <>
                            <MenuItem >
                                <Button variant='outlined' color='primary' onClick={() => navigate('signin')}
                                        sx={{ fontFamily: 'monospace',
                                            width: "180px",
                                            height: "40px",
                                            fontWeight: 600, color: "#fbf6f4",
                                            backgroundColor: "#896c63", borderRadius: "8px"}}>
                                    Sign in
                                </Button>
                            </MenuItem>
                            <MenuItem >
                                <Button variant='outlined' color='primary' onClick={() => navigate('register')}
                                        sx={{ fontFamily: 'monospace',
                                            width: "180px",
                                            height: "40px",
                                            fontWeight: 600, color: "#fbf6f4",
                                            backgroundColor: "#896c63", borderRadius: "8px"
                                        }}>
                                    Register
                                </Button>
                            </MenuItem>
                        </>
                            ) : ( location.pathname === "/seerequests" ) ? (
                            <MenuItem >
                                <Button variant='outlined' color='primary' onClick={() => navigate('request')}
                                        sx={{ fontFamily: 'monospace',
                                            width: "180px",
                                            height: "40px",
                                            fontWeight: 600, color: "#fbf6f4",
                                            backgroundColor: "#896c63", borderRadius: "8px"
                                        }}>
                                    Back
                                </Button>
                            </MenuItem>
                        ) : ( location.pathname === "/seeoffers" ) ? (
                            <MenuItem >
                                <Button variant='outlined' color='primary' onClick={() => navigate('offer')}
                                        sx={{ fontFamily: 'monospace',
                                            width: "180px",
                                            height: "40px",
                                            fontWeight: 600, color: "#fbf6f4",
                                            backgroundColor: "#896c63", borderRadius: "8px"
                                        }}>
                                    Back
                                </Button>

                            </MenuItem>
                            ) : (
                                <MenuItem >
                                    <Button variant='outlined' color='primary' onClick={() => navigate('home')}
                                            sx={{ fontFamily: 'monospace',
                                                width: "180px",
                                                height: "40px",
                                                fontWeight: 600, color: "#fbf6f4",
                                                backgroundColor: "#896c63", borderRadius: "8px"
                                            }}>
                                        Sign out
                                    </Button>
                                </MenuItem>



                        )}
             {/*           <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('request')}>Request</Button>
                        </MenuItem>
                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('offer')}>Offer</Button>
                        </MenuItem>
                        <MenuItem>
                            <Button variant='outlined' color='primary' onClick={() => navigate('seeOffers')}>Offered rides</Button>
                        </MenuItem>
                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('seerequests')}>See requests</Button>
                        </MenuItem>
             */}       </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Navigation;