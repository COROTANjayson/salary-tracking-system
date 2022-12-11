
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import {
    Typography,
    Button,
    useTheme
} from '@mui/material';
import { tokens } from "../../config/theme";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { useRouter } from "next/router";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getCompany } from "../../pages/api/company";
import { useDispatch } from "react-redux";
import { setAdminDrawerIndex } from "../../store/reducers/globalState";

const data = {
    name: '',
    address: '',
    leaves: '',
    overtimeLimit: '',
}

export default function ViewCompany() {
    const router = useRouter()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isError, setIsError] = useState(false);
    const [companyData, setCompData] = useState({ data })
    const dispatch = useDispatch()
    const id = router.query.slug

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await getCompany(id);
                // console.log(response.data)
                setCompData(await response.data)
            } catch (err) {
                if (err.response) {
                    console.log(err.response)
                } else {
                    console.log('Error: ', err.message)
                }
            }
        }
        if (id) {
            fetchCompany()
        }
        dispatch(setAdminDrawerIndex(`/admin/companies`))

    }, [id])
    
    const updateCompany = () => {
        router.push(`/company/form/${id}`)
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
                <Link href='/admin/companies' style={{ textDecoration: "none", color: `${colors.primary[200]}` }}>
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
                                    {companyData.name}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color={colors.grey[100]}
                                    sx={{ m: "0 0 5px 15px" }}
                                >
                                    {companyData.address}

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
                        width: '170px',
                        height: '40px',
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: '10px',
                    }}>
                        <Typography
                            variant="h5"
                            color={colors.grey[100]}
                        >
                            Allowable Leaves: {companyData.allowableLeaves}

                        </Typography>
                    </Box>
                    <Box sx={{
                        backgroundColor: `${colors.greenAccent[700]}`,
                        width: '170px',
                        height: '40px',
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: '10px'
                    }}>
                        <Typography
                            variant="h5"
                            color={colors.grey[100]}
                        // sx={{ m: "0 0 5px 15px" }}
                        >
                            Allowable Overtime: {companyData.allowableOvertime}
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
                            Delete Company
                        </Button>
                    </Box>
                </Box>

            </Box>
        </div>
    )
}
