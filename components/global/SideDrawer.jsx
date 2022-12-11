import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../config/theme";
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
import Container from '@mui/material/Container';
import Navbar from "./NavBar";
// import SideBa
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndex } from "../../store/reducers/globalState";
const drawerWidth = 200;

// const Item =()=> {
//     const router = useRouter()
//     // router.push('/dashboard')
//     const [selectedIndex, setSelectedIndex] = useState(1);

//     const handleListItemClick = ( index, link) => {
//         // console.log(event)
//         router.push(link)
//         setSelectedIndex(index);
//         console.log('----------',router.asPath)
//         console.log('hello',router.asPath)

//     };
//     // useEffect(() =>{
//     //     console.log('hi',router.asPath)

//     // }, [router])
//     console.log('hi',router.asPath)
//     return (
//       <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//         <List component="nav" aria-label="main mailbox folders">
//           <ListItemButton
//             selected={selectedIndex === 0}
//             onClick={() => handleListItemClick(0, '/dashboard')}
//           >
//             <Link href='/dashboard'>
//             <ListItemIcon>
//               <InboxIcon />
//             </ListItemIcon>
//             </Link>
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>
//         </List>
//         <Divider />
//         <List component="nav" aria-label="secondary mailbox folder">
//           <ListItemButton
//             selected={selectedIndex === 1}
//             onClick={(event) => handleListItemClick( 1, '/admin/companies')}
//           >
//             <ListItemText primary="Companies" />
//           </ListItemButton>

//           <ListItemButton
//             selected={selectedIndex === 2}
//             onClick={(event) => handleListItemClick( 2, '/admin/employers')}
//           >
//             <ListItemText primary="Employers" />
//           </ListItemButton>

//           <ListItemButton
//             selected={selectedIndex === 3}
//             onClick={(event) => handleListItemClick( 3, '/admin/users')}
//           >
//             <ListItemText primary="Users" />
//           </ListItemButton>
//         </List>
//       </Box>
//     );
// } 

export default function SideDrawer(props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const selectedIndex = useSelector(state => state.global.selectedIndex)

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    // const [selectedIndex, setSelectedIndex] = useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const Item = ({ title, icon, eventIndex, link, selected, setSelected }) => {
        const handleListItemClick = (event, index) => {
            router.push(link)

            dispatch(setSelected(index))
            console.log(selectedIndex, '-', index)

        };
        return (
            <div>
                <List>
                    <ListItem key={title} disablePadding>
                        <ListItemButton
                            selected={selected === eventIndex}
                            onClick={(event) => handleListItemClick(event, eventIndex)}
                        >
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        );
    }


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                sx={{
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
                            Responsive drawer
                        </Typography>
                    </Toolbar>
                    <Item />
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
                            Responsive drawer
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <Item
                        title="Dashboard"
                        icon={<MailIcon />}
                        link="/dashboard"
                        eventIndex={0}
                        selected={selectedIndex}
                        setSelected={setSelectedIndex}
                    />
                    <Divider />
                    <Item
                        title="Companies"
                        icon={<MailIcon />}
                        link="/admin/companies"
                        eventIndex={1}
                        selected={selectedIndex}
                        setSelected={setSelectedIndex}
                    />
                    <Item
                        title="Employers"
                        icon={''}
                        link="/admin/employers"
                        eventIndex={2}
                        selected={selectedIndex}
                        setSelected={setSelectedIndex}
                    />
                    <Item
                        title="Users"
                        icon={<MailIcon />}
                        link="/admin/users"
                        eventIndex={3}
                        selected={selectedIndex}
                        setSelected={setSelectedIndex}
                    />
                    <Divider/>
                    <Item
                        title="Add Employer"
                        icon={<MailIcon />}
                        link="/employer"
                        eventIndex={3}
                        selected={selectedIndex}
                        setSelected={setSelectedIndex}
                    />
                    {/* <Item /> */}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
             
               
                <Toolbar />

            </Box>
        </Box>
    );
}



