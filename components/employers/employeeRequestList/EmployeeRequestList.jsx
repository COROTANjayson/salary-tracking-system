
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../config/theme";
import { mockDataTeam } from "../../mockData";

// import Header from "../../components/Header";

import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box, Typography, useTheme, Container, Button
} from '@mui/material';
import Header from "../../Header";
import LeaveRequestDataGrid from "./LeaveDataGrid";
import OvertimeRequestDataGrid from "./OvertimeDataGrid";

// import Box from '@mui/material/Box';



export default function EmployeeRequestList() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [button, setButton] = useState('leave')
    
    return (
        <div>
            <Container>
                <Box
                    sx={{
                        marginTop: 8,

                    }}
                >

                    <Box m="20px">
                        <Header title="Request" subtitle="Employee leave and overtime request" />
                        <Box sx={{ display: 'flex' }}>
                            <Button
                                variant="outlined"
                                onClick={() => setButton('leave')}
                                sx={
                                    (button === 'leave') ?
                                        {
                                            mr: '5px',
                                            background: `${colors.blueAccent[500]}`,
                                            color: 'white',
                                            "&:hover": {
                                                backgroundColor: `${colors.blueAccent[500]} !important`,
                                                color: 'white'
                                            }
                                        } :
                                        {
                                            mr: '5px',
                                            color: `${colors.blueAccent[400]}`,
                                            borderColor: `${colors.blueAccent[400]}`,
                                            "&:hover": {

                                                backgroundColor: `${colors.blueAccent[300]} !important`,
                                                color: 'white'
                                            }
                                        }
                                }

                            >
                                Leave Request
                            </Button>
                            <Button variant="outlined"
                                onClick={() => setButton('overtime')}
                                sx={
                                    (button === 'overtime') ?
                                        {
                                            mr: '5px',
                                            background: `${colors.blueAccent[500]}`,
                                            color: 'white',
                                            "&:hover": {
                                                backgroundColor: `${colors.blueAccent[500]} !important`,
                                                color: 'white'
                                            }
                                        } :
                                        {
                                            mr: '5px',
                                            color: `${colors.blueAccent[400]}`,
                                            borderColor: `${colors.blueAccent[400]}`,
                                            "&:hover": {

                                                backgroundColor: `${colors.blueAccent[300]} !important`,
                                                color: 'white'
                                            }
                                        }
                                }
                            >
                                Overtime Request
                            </Button>
                        </Box>
                        <Box
                            m="20px 0 0 0"
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
                            }}
                        >
                            {
                                (button==='leave')? <LeaveRequestDataGrid/>: <OvertimeRequestDataGrid/>
                            }
                        </Box>
                    </Box>
                </Box>

            </Container>

        </div>
    )
}


