
import React, { useEffect, useState } from "react";
import { tokens } from "../../config/theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import { createCompany } from "../../pages/api/company";

// import Header from "../../components/Header";

import {
    Box, Typography, useTheme, Container, Button, TextField
} from '@mui/material';
import { useRouter } from "next/router";
import { setAdminDrawerIndex } from "../../store/reducers/globalState";
import { useDispatch, useSelector } from "react-redux";

// import Box from '@mui/material/Box';



export default function AddCompanyForm() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const router = useRouter()
    const dispatch = useDispatch()
    
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [compExist, setCompExist] = useState(false)
    
    useEffect(()=>{
        dispatch(setAdminDrawerIndex(`${router.asPath}`))
    }, [])

    const handleFormSubmit = async (values) => {
        // console.log(values);
        const companyData = values
        // console.log(companyData)
        let statusCode = 0
        let result = ''
        await createCompany(companyData)
        .then(res => {
          // console.log(res)
          statusCode = res.request.status
          console.log(statusCode)
          result = res.data
        })
        .catch((res) => {
        //   console.log(res)
          statusCode = res.response.request.status
          console.log(statusCode)
          result = res.response.data
        })
        
        if(statusCode === 201) {
            // dispatch(setCounter())
            setCompExist(false)
            router.push('/admin/companies')
        } 
        if(statusCode === 409) {
            setCompExist(true)
        }
        
    };
    return (
        <div>
            
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: `${isNonMobile ? 'start': 'center'}` ,

                    }}
                >
                    <Box m="20px">
                        <Header title="Add Company" subtitle="" />

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
                                            width={ 1}
                                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                            sx={{
                                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Address"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.address}
                                                name="address"
                                                error={!!touched.address && !!errors.address}
                                                helperText={touched.address && errors.address}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField
                                                fullWidth
                                                InputProps={{
                                                    inputProps: { min: 0
                                                    }
                                                }}
                                                variant="filled"
                                                type="number"
                                                label="Allowable Leaves"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.allowableLeaves}
                                                name="allowableLeaves"
                                                error={!!touched.allowableLeaves && !!errors.allowableLeaves}
                                                helperText={touched.allowableLeaves && errors.allowableLeaves}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <TextField
                                                fullWidth
                                                InputProps={{
                                                    inputProps: { min: 0
                                                    }
                                                }}
                                                variant="filled"
                                                type="number"
                                                label="Allowable Overtime"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.allowableOvertime}
                                                name="allowableOvertime"
                                                error={!!touched.allowableOvertime && !!errors.allowableOvertime}
                                                helperText={touched.allowableOvertime && errors.allowableOvertime}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                        </Box>
                                        {(compExist) ? <Typography variant="p" sx={{color: 'red'}}>Company already exist!</Typography>: <></>}

                                        <Box display="flex" justifyContent="end" mt="20px">
                                            <Button type="submit" color="secondary" variant="contained">
                                                Create New Company
                                            </Button>
                                        </Box>
                                    
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Box>
          

        </div>
    )
}

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    address: yup.string().required("required"),
    allowableLeaves: yup.string().required("required"),
    allowableOvertime: yup.string().required("required"),
});
const initialValues = {
    name: "",
    address: "",
    allowableLeaves: 0,
    allowableOvertime: 0,
};
