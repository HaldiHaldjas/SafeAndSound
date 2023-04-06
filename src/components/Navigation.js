import React from 'react';
import { Link, useNavigate } from "react-router-dom";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';



function Navigation() {


    return(
        <AppBar position="static" sx={{backgroundColor: 'darkgrey'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                    </Typography>

                    {/*This box is the normal menu on bigger devices*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>

                        {/*two ways with react-router-dom examples, using Link and useNavigate hook*/}
                        <MenuItem >
                            <Link to="signin"><Typography textAlign="center">Sign in</Typography></Link>
                        </MenuItem>

                        <MenuItem >
                            <Link to="register"><Typography textAlign="center">Register</Typography></Link>
                        </MenuItem>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navigation;