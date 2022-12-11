
import React, { useEffect, useState } from "react";
import { tokens } from "../../config/theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../Header";

import {
    Box,
    Typography,
    useTheme,
    Container,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useRouter } from "next/router";
import { getCompaniesAPI } from "../../pages/api/company";
import { createEmployee } from "../../pages/api/employee";
import { getEmployer } from "../../pages/api/employer";
import { setEmployerDrawerIndex } from "../../store/reducers/globalState";
import { useDispatch, useSelector } from "react-redux";

import { verifyToken } from "../../pages/api/jwt";

// import Box from '@mui/material/Box';

export default function AddEmployeeForm() {
    const dispatch = useDispatch()

    const [employer, setEmployer] = useState({})

    useEffect(() => {
        const data = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('token')) : null
        // console.log(data)
        const fetchAccount = async () => {
            const payload = await verifyToken(data)
            // return false if not token is invalid
            if (payload !== false) {
                const accountData = payload.data
                try {
                    // console.log(accountData.id)
                    const response = await getEmployer(accountData.id)
                    setEmployer(await response.data)
                } catch (err) {
                    if (err.response) {
                        console.log(err.response)
                    } else {
                        console.log('Error: ', err.message)
                    }
                }

            }
        }
        fetchAccount()
        dispatch(setEmployerDrawerIndex(`/employee`))

    }, [])
    return (
        <Box >
            <EmployeeAddComponent employer={employer} />
        </Box>
    )
}

const EmployeeAddComponent = (props) => {
    const theme = useTheme();
    const router = useRouter()
    const colors = tokens(theme.palette.mode);
    const [companies, setCompanies] = useState([])
    const [emailAvalilable, setEmailAvalilable] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { employer } = props

    const errorElement = <Box sx={{ textAlign: 'center', color: 'red' }}>Email already exist!</Box>

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
        fetchCompanies()
    }, [])

    const handleFormSubmit = async (values) => {
        // console.log(values);
        const employerData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            role: 'employee',
            employeeType: values.employeeType,
            salaryPerHR: values.salaryPerHR,
            companyId: employer.companyId,
            employeePosition: values.position
        }
        console.log(employerData)
        let statusCode = 0
        let result = ''
        await createEmployee(employerData).then(res => {
            // console.log(res)
            statusCode = res.request.status
            console.log(statusCode)
            result = res.data
        }).catch((res) => {
            console.log(res)
            statusCode = res.response.request.status
            console.log(statusCode)
            result = res.response.data
        })

        if (statusCode === 201) {
            setEmailAvalilable(false)
            router.push('/employee')

        }
        if (statusCode === 409) {
            setEmailAvalilable(true)
        }

    };
    return (
        <div>
            <Container>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: `${isNonMobile ? 'start' : 'center'}`,

                    }}
                >
                    <Box m="20px">
                        <Header title="Add Employee" subtitle="" />

                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={initialValues}
                            validationSchema={checkoutSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box

                                        display="grid"
                                        gap="20px"
                                        width={1}
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        sx={{
                                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="First Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            name="firstName"
                                            error={!!touched.firstName && !!errors.firstName}
                                            helperText={touched.firstName && errors.firstName}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Last Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            name="lastName"
                                            error={!!touched.lastName && !!errors.lastName}
                                            helperText={touched.lastName && errors.lastName}
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            name="email"
                                            error={!!touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            error={!!touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Position"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.position}
                                            name="position"
                                            error={!!touched.position && !!errors.position}
                                            helperText={touched.position && errors.position}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="number"
                                            label="Salary/hr"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.salaryPerHR}
                                            name="salaryPerHR"
                                            // error={!!touched.salaryPerHR && !!errors.salaryPerHR}
                                            // helperText={touched.salaryPerHR && errors.salaryPerHR}
                                            sx={{ gridColumn: "span 4" }}
                                            InputProps={{
                                                inputProps: {
                                                    min: 0
                                                }
                                            }}
                                        />
                                        <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                                            <InputLabel id="employeeType">Employee Type</InputLabel>
                                            <Select
                                                required
                                                variant="filled"
                                                labelId="employeeType"
                                                id="employeeType"
                                                name="employeeType"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.employeeType}
                                                // error={!!touched.employeeType && !!errors.employeeType}
                                                // helperText={touched.employeeType && errors.employeeType}
                                                label="employeeType"

                                            >

                                                <MenuItem value={'full-time'}>Full-time</MenuItem>
                                                <MenuItem value={'part-time'}>Part -time</MenuItem>


                                            </Select>
                                        </FormControl>

                                    </Box>
                                    {(emailAvalilable) ? errorElement : <></>}
                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <Button type="submit" color="secondary" variant="contained">
                                            Add New Employee
                                        </Button>
                                    </Box>

                                </form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Container>

        </div>
    )
}

// const phoneRegExp =
//     /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    // contact: yup
    //     .string()
    //     .matches(phoneRegExp, "Phone number is not valid")
    //     .required("required"),
    password: yup.string().required("required"),
    position: yup.string().required("required"),
    // salaryPerHR: yup.string().required("required"),
    // employeeType: yup.string().required("required"),

    // address2: yup.string().required("required"),
});
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    position: "",
    salaryPerHR: 0,
    employeeType: "full-time",
};
