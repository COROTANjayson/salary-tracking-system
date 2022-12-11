
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
// import { updateEmployee, getEmployer } from "../../pages/api/employer";
import { updateEmployee, getEmployee } from "../../pages/api/employee";

import {updateProfile} from '../../pages/api/profile'


export default function UpdateEmployeeForm() {
    const theme = useTheme();
    const router = useRouter()
    const id = router.query.slug

    const colors = tokens(theme.palette.mode);
    const [employee, setEmployee] = useState({
        id: '',
        accountId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        employeeType: '',
        position: '',
        salaryPerHR: 0,


    })
    const [companies, setCompanies] = useState([])
    const [emailAvalilable, setEmailAvalilable] = useState(false);
    const isNonMobile = useMediaQuery("(min-width:600px)");


    useEffect(() => {
        const fetchEmployee = async () => {
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
     
        fetchEmployee()
       
    }, [id])
    const handleFormSubmit = async (values) => {
        // console.log(values);

        // const employeeData = {
        //     firstName: values.firstName,
        //     lastName: values.lastName,
        //     email: values.email,
        //     password: values.password,
        //     role: 'employee',
        //     companyId: values.companyId,
        // }
        const employeeData = {
            employeeType:  values.employeeType,
            // companyId: employee.companyId,
            salaryPerHR: values.salaryPerHR,
            employeePosition: values.employeePosition
        }
        const accountData = {
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
        }

        let employeeStatus = 0
        let accountStatus = 0
        let result = ''

        await updateEmployee(id, employeeData).then(res => {
            employeeStatus = res.request.status
            result = res.data
        }).catch((res) => {
            employeeStatus = res.response.request.status
            console.log(employeeStatus)
            console.log(res.response.request)

        })
        await updateProfile(employee.accountId, accountData).then(res => {
            accountStatus = res.request.status
            result = res.data
        }).catch((res) => {
            accountStatus = res.response.request.status
            console.log(accountStatus)
        })

        if (accountStatus === 200 && employeeStatus === 200) {
            setEmailAvalilable(false)
            router.push(`/employee/${id}`)

        }
        if (accountStatus === 404 && employeeStatus === 404) {
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
                    <Header title="Update Employee" subtitle="" />
                    <Formik
                        onSubmit={handleFormSubmit}
                        enableReinitialize
                        initialValues={employee}
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
                                        disabled
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
                                            value={values.employeePosition}
                                            name="employeePosition"
                                            error={!!touched.employeePosition && !!errors.employeePosition}
                                            helperText={touched.employeePosition && errors.employeePosition}
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
                                        Update Employee
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
    companyId: yup.string().required("required"),

    // address2: yup.string().required("required"),
});
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyId: "",
};
