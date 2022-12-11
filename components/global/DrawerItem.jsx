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
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import SideBa
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIndex } from "../../store/reducers/globalState";

const Item = ({ title, icon, eventIndex, link, selected, setSelected }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleListItemClick = (event, index) => {
        router.push(link)

        dispatch(setSelected(index))

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

export const AdminDrawer = ({ window, children }) => {
    const router = useRouter()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const selectedIndex = useSelector(state => state.global.selectedIndex)

    return (
        <>
            <Box sx={{ p:'10px', width: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3" color={colors.greenAccent[300]}>
                    ADMIN
                </Typography>
            </Box>

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
            <Divider />
            <Item
                title="Add Employer"
                icon={<MailIcon />}
                link="/employer/form"
                eventIndex={4}
                selected={selectedIndex}
                setSelected={setSelectedIndex}
            />
            <Item
                title="Add Company"
                icon={<MailIcon />}
                link="/company/form"
                eventIndex={5}
                selected={selectedIndex}
                setSelected={setSelectedIndex}
            />
        </>
    )
}

export const EmployerDrawer = ({ window, children }) => {
    const router = useRouter()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const selectedIndex = useSelector(state => state.global.selectedIndex)

    return (
        <>
            <Box sx={{ p:'10px', width: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3" color={colors.greenAccent[300]}>
                    Employer
                </Typography>
            </Box>
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
                title="Employees"
                icon={<MailIcon />}
                link="/employee"
                eventIndex={1}
                selected={selectedIndex}
                setSelected={setSelectedIndex}
            />
            <Item
                title="Requests"
                icon={<MailIcon />}
                link="/employee/request"
                eventIndex={5}
                selected={selectedIndex}
                setSelected={setSelectedIndex}
            />
        </>
    )
}

export const EmployeeDrawer = ({ window, children }) => {
    const router = useRouter()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const selectedIndex = useSelector(state => state.global.selectedIndex)

    return (
        <>
            <Box sx={{ p:'10px', width: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3" color={colors.greenAccent[300]}>
                    Employee
                </Typography>
            </Box>
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
                title="Dashboard"
                icon={<MailIcon />}
                link="/admin/companies"
                eventIndex={1}
                selected={selectedIndex}
                setSelected={setSelectedIndex}
            />
            <Item
                title="Request"
                icon={<MailIcon />}
                link="/request"
                eventIndex={2}
                selected={selectedIndex}
                setSelected={setSelectedIndex}
            />
        </>
    )
}