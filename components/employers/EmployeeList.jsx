
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../config/theme";
import { mockDataContacts } from "../mockData";
import { useRouter } from "next/router";
import {
    Box, useTheme, Container, Button
} from '@mui/material';

import Link from "next/link";
import Header from "../Header";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { map } from 'lodash'
import PageviewIcon from '@mui/icons-material/Pageview';
import { getEmployee } from "../../pages/api/employee";
import { getEmployer } from "../../pages/api/employer";
import { verifyToken } from "../../pages/api/jwt";



export default function EmployeeList() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const router = useRouter()
    const [employer, setEmployer] = useState({})

    useEffect(() => {
        const token = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('token')) : undefined
        // console.log(data)
        const fetchEmployer = async () => {
            const payload = await verifyToken(token)
            // return false if not token is invalid
            if (payload !== false) {
                const accountData = payload.data
                try {
                    // console.log(accountData.id)
                    const response = await getEmployer(accountData.id)

                    console.log(response.data)
                    setEmployer(await response.data)
                } catch (err) {
                    if (err.response) {
                        console.log(err.response.status)
                    } else {
                        console.log('Error: ', err.message)
                    }
                }

            }
        }

        if (token !== undefined) {
            fetchEmployer()
        }

    }, [])


    return (
        <div>
            <Box m="20px">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Header
                        title="Employee"
                        subtitle="List of Employee"
                    />
                    <Link href='/employee/form' style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="secondary" startIcon={<PersonAddIcon />}>
                            Add Employee
                        </Button>
                    </Link>
                </Box>
                <Box
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                    }}
                >
                    <EmployeeTable employer={employer} />
                </Box>
            </Box>
        </div>
    )
}

const EmployeeTable = ({ employer }) => {
    const router = useRouter()
    const [employees, setEmployee] = useState([])

    useEffect(() => {
        const fetchEmployee = async () => {
            console.log()
            if (employer.companyId) {
                try {
                    const response = await getEmployee(employer.companyId);
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

    }, [employer])

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        {
            field: "firstName",
            headerName: "First Name",
            // flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "lastName",
            headerName: "Surname",
            // flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        // {
        //     field: "password",
        //     // field: "password",
        //     headerName: "Password",
        //     flex: 1,
        // },

        {
            field: "employeePosition",
            headerName: "Position",
            flex: 1,
        },
        {
            field: "employeeType",
            headerName: "Employee Type",
            flex: 1,
        },
        {
            field: "view",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    // <Link href='/company' style={{ textDecoration: "none" }}>
                    <Button onClick={() => {
                        router.push(`/employee/${id}`)
                    }}
                        variant="contained" color="secondary" startIcon={<PageviewIcon />}>
                        View
                    </Button>
                    // </Link>
                );
            },
        },

    ];
    return (
        <>
            <DataGrid
                rows={employees}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
            />
        </>
    )
}
