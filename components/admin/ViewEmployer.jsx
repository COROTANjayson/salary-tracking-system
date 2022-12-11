
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import {
    useMediaQuery,
    Container,
    Typography,
    Button,
    useTheme
} from '@mui/material';
import { tokens } from "../../config/theme";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { useRouter } from "next/router";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getEmployer } from "../../pages/api/employer";
import { useDispatch, useSelector } from "react-redux";
import { setAdminDrawerIndex } from "../../store/reducers/globalState";


export default function ViewEmployer() {
    const router = useRouter()
    const dispatch = useDispatch()
    const id = router.query.slug
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isError, setIsError] = useState(false);
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

                    const response = await getEmployer(id);
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
        dispatch(setAdminDrawerIndex(`/admin/employers`))


    }, [id])

    const updateCompany = () => {
        router.push(`/employer/form/${employee.id}`)
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
                <Link href='/admin/employers' style={{ textDecoration: "none", color: `${colors.primary[200]}` }}>
                    <ArrowBackIosIcon sx={{ marginBottom: '10px' }} />
                </Link>


                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Box sx={{
                        borderRadius: '10px',
                        width: 150,
                        height: 150,
                        background: `${colors.grey[200]}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
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
                                    variant="h5"
                                    color={colors.grey[100]}
                                    sx={{ m: "0 0 5px 15px" }}
                                >
                                    {employee.name}
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
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: '20px' }}>
                    <Box sx={{
                        backgroundColor: `${colors.blueAccent[700]}`,
                        width: '400px',
                        height: '40px',
                        borderRadius: '5px',
                        display: 'flex',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        mb: '10px',
                        p: '10px',
                    }}>
                        <Typography
                            variant="h5"
                            color={colors.grey[100]}
                        >
                            Email: {employee.email}

                        </Typography>
                    </Box>
                    <Box sx={{
                        backgroundColor: `${colors.greenAccent[700]}`,
                        width: '400px',
                        height: '40px',
                        borderRadius: '5px',
                        display: 'flex',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        mb: '10px',
                        p: '10px',
                    }}>
                        <Typography
                            variant="h5"
                            color={colors.grey[100]}
                        // sx={{ m: "0 0 5px 15px" }}
                        >
                            Password: {employee.password}
                        </Typography>
                    </Box>
                    <Box sx={{ height: 350 }}>

                    </Box>
                    <Box sx={{ width: 1, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ width: 3 / 5 }}
                        // startIcon={<AddCircleIcon />}
                        >
                            Delete Employer
                        </Button>
                    </Box>
                </Box>

            </Box>
        </div>
    )
}
