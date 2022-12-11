
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import {
    useMediaQuery,
    Container,
    Typography,
    Button,
    useTheme,
    Grid,
} from '@mui/material';
import { tokens } from "../../config/theme";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { useRouter } from "next/router";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
    getEmployee,
    
} from "../../pages/api/employee";
import { textAlign } from "@mui/system";
import Details from "./components/Details";
import { setEmployerDrawerIndex } from "../../store/reducers/globalState";


export default function ViewEmployee() {
    const dispatch = useDispatch()

    const counter = useSelector(state => state.global.counter)
    const router = useRouter()
    const id = router.query.slug
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isError, setIsError] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:1000px)");

    const [employee, setEmployee] = useState({
        id: '',
        accountId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        companyId: '',
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    useEffect(() => {
        const fetchEmployer = async () => {
            if (id) {
                try {

                    const response = await getEmployee(id);
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
        
        fetchEmployer()
        dispatch(setEmployerDrawerIndex(`/employee`))

    }, [id, counter])

    const updateCompany = () => {
        router.push(`/employee/form/${employee.id}`)
    }
    return (
        <div>
            <Box
                sx={{
                    m: '20px',
                    marginTop: 8,
                    // backgroundColor: 'blue',
                    // width: '100%'

                }}
            >
                <Link href='/employee' style={{ textDecoration: "none", color: `${colors.primary[200]}` }}>
                    <ArrowBackIosIcon sx={{ marginBottom: '10px' }} />
                </Link>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: `${isNonMobile ? 'row' : 'column'}`,
                        width: 1,

                    }}
                >
                    <Box sx={{
                        borderRadius: '10px',
                        width: 170,
                        height: 170,
                        background: `${colors.grey[200]}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: `${isNonMobile ? '0' : '10px'}`
                    }}>
                        <Typography
                            variant="h2"
                            color="#e0e0e0"
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >
                            Image
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: 5 / 6 }}>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <Box>
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "0 0 5px 15px" }}
                                >
                                    {`${employee.firstName} ${employee.lastName}`}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={colors.grey[100]}
                                    sx={{ m: "0 0 5px 15px" }}
                                >
                                    {employee.employeePosition}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={colors.grey[100]}
                                    sx={{ m: "0 0 5px 15px", textTransform: 'capitalize' }}
                                >
                                    {employee.employeeType}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={colors.grey[100]}
                                    sx={{ m: "0 0 5px 15px"}}
                                >
                                    Email: {employee.email}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={colors.grey[100]}
                                    sx={{ m: "0 0 5px 15px", textTransform: 'capitalize' }}
                                >
                                    Password: {employee.password}
                                </Typography>
                            </Box>
                            <Box>
                                <Button variant='contained' sx={{
                                    background: `${colors.blueAccent[500]}`,
                                    "&:hover": {
                                        backgroundColor: `${colors.blueAccent[300]} !important`
                                    }
                                }}
                                    startIcon={<EditIcon />}

                                    onClick={updateCompany}
                                >
                                    Update
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                </Box>
                <Details employee={employee} />
            </Box>
        </div>
    )
}

