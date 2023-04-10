import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';


function Navigation() {


    return(
        <AppBar position="static" sx={{backgroundColor: 'darkgrey'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <DirectionsCarIcon></DirectionsCarIcon>
                     <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            paddingLeft: "20px",
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    Safe and sound
                    </Typography>

                    {/*This box is the normal menu on bigger devices*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>


                        <MenuItem >
                            <Link to="request"><Typography textAlign="center">Request</Typography></Link>
                        </MenuItem>
                        <MenuItem >
                            <Link to="signin"><Typography textAlign="center">Sign in</Typography></Link>
                        </MenuItem>

                        <MenuItem >
                            <Link to="register"><Typography textAlign="center">Register</Typography></Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/seedata"><Typography textAlign="center">Offered rides</Typography></Link>
                        </MenuItem>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navigation;