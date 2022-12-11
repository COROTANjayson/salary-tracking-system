
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
import {map} from 'lodash'
import PageviewIcon from '@mui/icons-material/Pageview';
import { getEmployers } from "../../pages/api/employer";

export default function EmployerList() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const router = useRouter()
    const [employers, setEmployers] = useState([])
    
    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const response = await getEmployers();
                setEmployers(await response.data)
            } catch (err) {
                if (err.response) {
                    console.log(err.response)
                } else {
                    console.log('Error: ', err.message)
                }
            }
        }
        fetchEmployers()
    }, [])

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
        {
            field: "password",
            // field: "password",
            headerName: "Password",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Company Name",
            flex: 1,
        },
        {
            field: "view",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    // <Link href='/company' style={{ textDecoration: "none" }}>
                    <Button onClick={() => {
                        router.push(`/employer/${id}`)
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
                        subtitle="List of Employer"
                    />
                    <Link href='/employer/form' style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="secondary" startIcon={<PersonAddIcon />}>
                            Add Employer
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
                    <DataGrid
                        rows={employers}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </Box>
        </div>
    )
}
