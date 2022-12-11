import React, { useEffect, useState } from "react";
import Link from 'next/link'
import {
    useMediaQuery,
    Container,
    Typography,
    Button,
    useTheme,
    Grid,
} from '@mui/material';
import { tokens } from "../../../config/theme";
// import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
// import { useRouter } from "next/router";
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import {
//     getEmployee,
//     getLeavesRemaining,
//     getTotalAbsences,
//     getTotalOvertime,
//     getDailyWage,
//     getMonthlySalary
// } from "../../pages/api/employee";
// import { textAlign } from "@mui/system";
// import Details from "./components/Details";


export default function GridItem  ({ title, content, xs, md })  {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Grid item xs={8} sm={8} md={4} >
            <Box sx={{
                backgroundColor: `${colors.greenAccent[600]}`,
                flexDirection: 'column',
                borderRadius: '5px',
                display: 'flex',
                height: 100,
                // justifyContent: 'center',
                // alignItems: 'center',
                p: '10px',
            }}>
                <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    align='left'
                    sx={{ marginLeft: '10px' }}
                >
                    {title}
                </Typography>
                <Box sx={{
                    height: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography
                        variant="h5"
                        color={colors.grey[100]}
                    // align='center'
                    >
                        {content}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    )
}
