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
                    <DirectionsCarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></DirectionsCarIcon>
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

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>

                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('request')}>Request</Button>
                        </MenuItem>
                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('signin')}>Sign in</Button>
                        </MenuItem>

                        <MenuItem >
                            <Button variant='outlined' color='primary' onClick={() => navigate('register')}>Register</Button>
                        </MenuItem>
                        <MenuItem>
                            <Button variant='outlined' color='primary' onClick={() => navigate('seedata')}>Offered rides</Button>
                        </MenuItem>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navigation;