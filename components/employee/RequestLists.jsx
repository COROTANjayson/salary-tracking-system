
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../config/theme";
import { mockDataContacts } from "../mockData";
import { useRouter } from "next/router";
import {
    Box, useTheme, Container, Button, BottomNavigation, BottomNavigationAction
} from '@mui/material';

import Link from "next/link";
import Header from "../Header";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { map } from 'lodash'
import PageviewIcon from '@mui/icons-material/Pageview';
import { getEmployee } from "../../pages/api/employee";
import { getEmployer } from "../../pages/api/employer";
import { verifyToken } from "../../pages/api/jwt";
import { DisplayLeaveListTable, DisplayRequestLeaveListTable } from "../employers/table/LeaveListTable";
import { DisplayAbsenceListTable } from "../employers/table/AbsenceListTable";
import {
    DisplayRequestOverTimeListTable,
    DisplayOverTimeListTable,
} from "../employers/table/OverTimeListTable";

export default function RequestList() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const router = useRouter()

    const [employee, setEmployee] = useState({})
    const [requestNav, setRequestNav] = useState(0);
    useEffect(() => {
        const data = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('token')) : undefined
        // console.log(data)
        const fetchEmployee = async () => {
            const payload = await verifyToken(data)
            // return false if not token is invalid
            if (payload !== false) {
                const accountData = payload.data
                try {
                    // console.log(accountData.id)
                    const response = await getEmployee(accountData.id)
                    setEmployee(await response.data)
                } catch (err) {
                    if (err.response) {
                        console.log(err.response)
                    } else {
                        console.log('Error: ', err.message)
                    }
                }

            }
        }
        fetchEmployee()

    }, [])

    let table = <DisplayLeaveListTable leaveList={employee.leaves} employeeId={employee.id} />
    switch (requestNav) {
        case 0:
            table = <DisplayLeaveListTable leaveList={employee.leaves} employeeId={employee.id} />
            break;
        case 1:
            table = <DisplayAbsenceListTable absenceList={employee.absence} employeeId={employee.id} />
            break;
        case 2:
            table = <DisplayOverTimeListTable overtimeList={employee.overtime} employeeId={employee.id} />
            break;
        case 3:
            table = <DisplayRequestLeaveListTable leaveList={employee.requestLeave} employeeId={employee.id} />
            break;
        case 4:
            table = <DisplayRequestOverTimeListTable overtimeList={employee.requestOvertime} employeeId={employee.id} />
            break;
        default:
            table = <DisplayLeaveListTable leaveList={employee.leaves} employeeId={employee.id} />
    }
    return (
        <div>
            <Box m="20px">
                <Box
                    sx={{
                        marginTop: 8,

                    }}
                >
                    <Header
                        title="Request Lists"
                        subtitle="Lists of request for leave, overtime and absences"
                    />
                    <Box sx={{ mt: 2, pb: 2, boxShadow: 1 }} bgcolor='white'>
                        <BottomNavigation
                            sx={{
                                mb: 2,
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
                            <BottomNavigationAction label="Leaves" />
                            <BottomNavigationAction label="Absences" />
                            <BottomNavigationAction label="Overtime" />
                            <BottomNavigationAction label="Request Leave" />
                            <BottomNavigationAction label="Request Overtime" />
                        </BottomNavigation>
                        {table}
                    </Box>
                </Box>
            </Box>
        </div>
    )
}
