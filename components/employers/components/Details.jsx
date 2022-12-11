import { useDispatch, useSelector } from 'react-redux';
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
import BottomNav from "./Navigation";



export default function Details ({ employee })  {
    const counter = useSelector(state => state.global.counter)

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const employeeID = employee.id
    const [leavesRemaining, setLeavesRemainig] = useState(0)
    const [ttlAbsences, setTotalAbsences] = useState(0)
    const [ttlOvertime, setTotalOvertime] = useState(0)
    // const [totalLeaves, setTotalLeaves] = useState(0)
    const [dailyWage, setDailyWage] = useState(0)
    const [totalMonthlySalary, setTotalMonthlySalary] = useState(0)
    useEffect(() => {
        const fetchComputation = async () => {
            if (employee) {
                const leavesRemaining = await getLeavesRemaining(employeeID)
                setLeavesRemainig(await leavesRemaining.data.result)
                const ttlAbsences = await getTotalAbsences(employeeID)
                setTotalAbsences(await ttlAbsences.data.result)
                const ttlOvertime = await getTotalOvertime(employeeID)
                setTotalOvertime(await ttlOvertime.data.result)
                const dailyWage = await getDailyWage(employeeID)
                setDailyWage(await dailyWage.data.result)
                const totalMonthlySalary = await getMonthlySalary(employeeID)
                setTotalMonthlySalary(await totalMonthlySalary.data.result)

            }

        }
        if (employeeID) {
            fetchComputation()
        }
    }, [employeeID, counter])


    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '20px' }}>
                <Container >
                    <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 12 }} >
                        <GridItem
                            title='Leaves'
                            content={`${employee.allowableLeaves - leavesRemaining}/${employee.allowableLeaves}`}
                        />
                        <GridItem
                            title='Overtime'
                            content={`${ttlOvertime}/${employee.allowableOvertime}`}
                        />
                        <GridItem
                            title='Absences'
                            content={ttlAbsences}
                        />
                    </Grid>
                    <Container sx={{
                        backgroundColor: `${colors.blueAccent[600]}`,
                        flexDirection: 'column',
                        borderRadius: '5px',
                        display: 'flex',
                        // height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: '10px',
                        mt: 2
                    }}>
                        <Box >
                            Salary/hr: {employee.salaryPerHR}
                        </Box>
                        <Box >
                            Daily Wage: {dailyWage}
                        </Box>
                        <Box >
                            Current Month total Salary: {totalMonthlySalary}
                        </Box>
                    </Container>
                </Container>
                <BottomNav employee={employee}/>
                <Box sx={{ width: 1, marginTop: '200px', display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ width: 3 / 5 }}
                    // startIcon={<AddCircleIcon />}
                    >
                        Delete Employee
                    </Button>
                </Box>
            </Box>
        </>
    )
}