
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../config/theme";
import { mockDataTeam } from "../../mockData";

// import Header from "../../components/Header";

import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box, Typography, useTheme, Container, Button
} from '@mui/material';

// import Box from '@mui/material/Box';

export default function LeaveRequestDataGrid() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "employeePosition",
            headerName: "Position",
            flex: 1,
        },

        {
            field: "reason",
            headerName: "Reason",
            flex: 1,
        },
        {
            field: "Accept",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    // <Link href='/company' style={{ textDecoration: "none" }}>
                    <Button onClick={() => {
                    }}
                        variant="contained"
                        sx={{
                            background: `${colors.blueAccent[500]}`,
                            "&:hover": {
                                backgroundColor: `${colors.blueAccent[300]} !important`
                            }
                        }}
                    >
                        Accept
                    </Button>
                    // </Link>
                );
            },
        },
        {
            field: "Deny",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    // <Link href='/company' style={{ textDecoration: "none" }}>
                    <Button onClick={() => {
                    }}
                        variant="contained"
                        sx={{
                            background: `${colors.redAccent[500]}`,
                            "&:hover": {
                                backgroundColor: `${colors.redAccent[300]} !important`
                            }
                        }}
                    >
                        Deny
                    </Button>
                    // </Link>
                );
            },
        },
    ];

    return (
        <DataGrid rows={mockDataTeam} columns={columns} />
    )
}