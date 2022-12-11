import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../config/theme";
import React, { useEffect } from 'react';
import { useContext } from "react";
import { createTheme } from '@mui/material/styles';
import { useState } from "react";
import Link from "next/link";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Navbar from "./global/NavBar";
// import SideBa
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndex } from "../store/reducers/globalState";
import { AdminDrawer, EmployeeDrawer, EmployerDrawer } from './global/DrawerItem'
import { verifyToken } from "../pages/api/jwt";

const drawerWidth = 200;
{/* <div className='app'> */ }
{/* <SideBar/> */ }
{/* <main className='content'> */ }
{/* <NavBar/> */ }
// <SideDrawer>
// {children}
// </SideDrawer>
// </main>

// </div>

export default function SideDrawer({ window, children }) {
    // const dispatch = useDispatch()
    const router = useRouter()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const selectedIndex = useSelector(state => state.global.selectedIndex)
    const [account, setAccount] = useState({})
    // const [DrawerElement, setDrawerElement] = useState(<AdminDrawer />)
    const fetchAccount = async (token) => {
        
        const payload = await verifyToken(token)
        if (payload === false) {
            router.push('/login')
        } else {
            if(account){
                const account = payload.data
                setAccount(account)
            }
         
           
            // setLoading(false)
        }
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token === null||undefined) {
            router.push('/login')
        } else {
            fetchAccount(token)
        }

    }, [])
    let DrawerElement = <AdminDrawer />
    if (account.role === 'admin') {
        DrawerElement= <AdminDrawer />
    }
    if (account.role === 'employer') {
        DrawerElement=<EmployerDrawer />

    }
    if (account.role === 'employee') {
        DrawerElement=<EmployeeDrawer/>

    }
    
    // const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    // const [selectedIndex, setSelectedIndex] = useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const loggedOut = () => {
        localStorage.removeItem('token')
        // localStorage.removeItem('login')
        router.push('/')
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                sx={{
                    background: `${theme.palette.mode === "dark" ? colors.primary[500] : colors.primary[400]}`,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Navbar />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                {/* Mobile app */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            STS
                        </Typography>
                    </Toolbar>
                </Drawer>

                {/* Desktop app */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            SSTS
                        </Typography>
                    </Toolbar>
                    <Divider />
                    {/* Drawer Element */}
                    {DrawerElement}
                    <Divider />
                    <Button variant="contained" color='secondary' onClick={loggedOut}>Logout</Button>

                    {/* <Item /> */}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >

                {children}
                <Toolbar />

            </Box>
        </Box>
    );
}



