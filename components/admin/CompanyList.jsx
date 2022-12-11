
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../config/theme";
import { mockDataContacts } from "../mockData";

// import Header from "../../components/Header";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PageviewIcon from '@mui/icons-material/Pageview';
import {
    Box, Typography, useTheme, Container, Button
} from '@mui/material';
import Header from "../Header";
import { useRouter } from "next/router";
import { getCompaniesAPI } from "../../pages/api/company";


export default function CompanyList() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const router = useRouter()

    const [companies, setCompanies] = useState([])
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getCompaniesAPI();
                setCompanies(await response.data)
            } catch (err) {
                if (err.response) {
                    console.log(err.response)
                } else {
                    console.log('Error: ', err.message)
                }
            }
        }
        // console.log('counter',counter)
        fetchCompanies()
    }, [])

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        // {
        //     field: "address",
        //     headerName: "Address",
        //     type: "number",
        //     headerAlign: "left",
        //     align: "left",
        // },
        {
            field: "address",
            headerName: "Address",
            flex: 2,
        },
        {
            field: "allowableLeaves",
            headerName: "Leaves",
            flex: 1,
        },
        {
            field: "allowableOvertime",
            headerName: "Overtime",
            flex: 1,
        },
        {
            flex: 1,
            field: "view",
            renderCell: ({ row: { id } }) => {
                return (
                    // <Link href='/company' style={{ textDecoration: "none" }}>
                    <Button onClick={() => {
                        router.push(`/company/${id}`)
                    }}
                        variant="contained" color="secondary" startIcon={<PageviewIcon />}>
                        View
                    </Button>
                    // </Link>
                );
            },
        },
        // {
        //     field: "email",
        //     headerName: "Email",
        //     flex: 1,
        // },

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
                        title="Company"
                        subtitle="List of companies"
                    />
                    <Link href='/company' style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />}>
                            Add Company
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
                        rows={companies}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </Box>
        </div>
    )
}
