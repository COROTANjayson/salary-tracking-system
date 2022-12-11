import React, { useEffect, useState } from "react";
import Link from 'next/link'
import {
    useMediaQuery,
    Container,
    Typography,
    Button,
    useTheme,
    Grid,
    BottomNavigationAction,
    BottomNavigation
} from '@mui/material';
import { tokens } from "../../../config/theme";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { useRouter } from "next/router";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
    getEmployee,
    getLeavesRemaining,
    getTotalAbsences,
    getTotalOvertime,
    getDailyWage,
    getMonthlySalary
} from "../../../pages/api/employee";
import { textAlign } from "@mui/system";
import GridItem from "./GridItems";
import { LeaveListTable, RequestLeaveListTable } from "../table/LeaveListTable";
import { AbsenceListTable } from "../table/AbsenceListTable";
import { OverTimeListTable, RequestOverTimeListTable } from "../table/OverTimeListTable";


export default function BottomNav({ employee }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const employeeID = employee.id
    const [requestNav, setRequestNav] = useState(0);


    let table = <LeaveListTable leaveList={employee.leaves} employeeId={employeeID} />
    switch (requestNav) {
        case 0:
            table = <LeaveListTable leaveList={employee.leaves} employeeId={employeeID} />
            break;
        case 1:
            table = <AbsenceListTable absenceList={employee.absence} employeeId={employeeID} />
            break;
        case 2:
            table = <OverTimeListTable overtimeList={employee.overtime} employeeId={employeeID} />
            break;
        case 3:
            table = <RequestLeaveListTable leaveList={employee.requestLeave} employeeId={employeeID} />
            break;
        case 4:
            table = <RequestOverTimeListTable overtimeList={employee.requestOvertime} employeeId={employeeID} />
            break;
        default:
            table = <LeaveListTable leaveList={employee.leaves} employeeId={employeeID} />
    }

    return (
        <>
            <Box sx={{ mt: 2, pb: 2, boxShadow: 1,  }} bgcolor='white'>
                <BottomNavigation
                    // color='default'
                    sx={{
                            backgroundColor: colors.redAccent[500],
                           
                            "& .MuiBottomNavigationAction-label": {
                                color: `white`
                            },


                        }}
                    showLabels
                    value={requestNav}
                    onChange={(event, newValue) => {
                        setRequestNav(newValue);
                    }}
                >
                    <BottomNavigationAction sx={{
                        ".MuiSelected-label": {
                            color: `blue !important`,
                            fontSize: 12
                        },
                    }} label="Leaves" />
                    <BottomNavigationAction label="Absences" />
                    <BottomNavigationAction label="Overtime" />
                    <BottomNavigationAction label="Request Leave" />
                    <BottomNavigationAction label="Request Overtime" />
                </BottomNavigation>
                {table}
            </Box>
        </>
    )
}