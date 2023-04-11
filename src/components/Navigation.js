import React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Button from '@mui/material/Button';


function Navigation() {

    const navigate = useNavigate();


    return(
        <AppBar position="static" sx={{backgroundColor: 'darkgrey'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <DirectionsCarIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                    </DirectionsCarIcon>
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

                    <Box sx={{
                        display: "flex",
                        justifyContent: { xs: "flex-start", md: "flex-end"},
                        alignItems: "center",
                    }}>


                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('signin')}>Sign in</Button>
                        </MenuItem>
                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('register')}>Register</Button>
                        </MenuItem>
                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('request')}>Request</Button>
                        </MenuItem>
                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('offer')}>Offer</Button>
                        </MenuItem>
                        <MenuItem>
                            <Button variant='outlined' color='primary' onClick={() => navigate('seeOffers')}>Offered rides</Button>
                        </MenuItem>
                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('seeRequests')}>See requests</Button>
                        </MenuItem>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navigation;