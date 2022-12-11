
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../config/theme";
import { mockDataTeam } from "../mockData";

import Header from "../Header";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import {
  Box, Typography, useTheme, Container
} from '@mui/material';
import { setAdminDrawerIndex } from "../../store/reducers/globalState";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
// import Box from '@mui/material/Box';
import { getProfiles } from "../../pages/api/profile";



export default function UserList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter()
  const dispatch = useDispatch()
  const [account, setAccount] = useState([])

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await getProfiles();
        setAccount(await response.data)
      } catch (err) {
        if (err.response) {
          console.log(err.response)
        } else {
          console.log('Error: ', err.message)
        }
      }
    }
    fetchAccount(account)
    dispatch(setAdminDrawerIndex(`${router.asPath}`))

  }, [])
  console.log(account)
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "First Name",
     
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
    
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            // backgroundColor={
            //   role === "admin"
            //     ? colors.greenAccent[600]
            //     : role === "employer"
            //       ? colors.greenAccent[700]
            //       : colors.greenAccent[700]
            // }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "employer" && <SecurityOutlinedIcon />}
            {role === "employee" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <div>
      <Container
       sx={{
        marginTop: 8,
    
      }}
      >
        <Box m="20px">
          <Header title="Users" subtitle="list of users" />
          <Box
            m="40px 0 0 0"
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
            <DataGrid rows={account} columns={columns} />
          </Box>
        </Box>
      </Container>

    </div>
  )
}
