import _ from "lodash";
import {
    Button,
    Container,
    Box,
    Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper,
    } from '@mui/material';

import { Delete} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import React, {useState, useEffect} from "react";
import { LeavesModal } from "../../employee/modal/LeavesModal";
import { setCounter } from "../../../store/reducers/globalState";
import { getLeaves, deleteLeave,updateLeave } from "../../../pages/api/employee";

export const LeaveListTable = (props) =>{
    const dispatch = useDispatch()
    const {leaveList, employeeId} = props
    const [leaves, setLeaves] = useState([]);
    const [counter, setCount] = useState(0);

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await getLeaves(employeeId);
                setLeaves(await response.data)
            } catch(err) {
                if(err.response) {
                    console.log(err.response)
                } else {
                    console.log('Error: ', err.message)
                }
            }
        }
        // console.log('counter',absences)
        if(employeeId){
            fetchLeaves()
        }
        
    //   if(leaveList){
    //     setLeaves(leaveList)
    //   }
    }, [counter])
    return(
      <Container>
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between' }} >  
            <Typography variant="h6" component="span">
                Leave List
            </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <TableContainer component={Paper} sx={{height:450}} >
                <Table  aria-label="simple table">
                    <TableHead sx={{background: '#0ea5e9'}} align="center">
                    <TableRow >
                        <TableCell sx={{ color: '#ffffff'}}>Reason</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Date Stated</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Date Ended</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {leaves.map((row, index) => {
                        if(row.approved === true){
                        return (
                        
                            <TableRow
                            key={index}
                            >
                            <TableCell component="th" scope="row">
                                {row.reason}
                            </TableCell>
                            <TableCell >{new Date(row.dateStarted).toLocaleDateString()}</TableCell>
                            <TableCell >{new Date(row.dateEnded).toLocaleDateString()}</TableCell>
                            <TableCell >
                                <Button 
                                onClick={() =>{
                                    deleteLeave(row.id).then(res =>{
                                        console.log(res.request.status)
                                        setCount(counter+1)
                                        dispatch(setCounter())
                                    }).catch((res) => {
                                        // const statusCode = res.response.request.status
                                        console.log(res)
                                    })
                                //     dispatch(
                                //     removeDate({
                                //     accountID: accountID,
                                //     checkDate: 'leave',
                                //     index: index
                                // }))
                                
                                }}>
                                    <Delete sx={{color: 'red'}}/>
                                </Button>
                            </TableCell>
                            </TableRow>
                        )}
                    }
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box> 
    </Container>
    )
   
  }

export const RequestLeaveListTable = (props) =>{
    const dispatch = useDispatch()
    const {leaveList, employeeId} = props
    const [leaves, setLeaves] = useState([]);
    const [counter, setCount] = useState(0);
    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await getLeaves(employeeId);
                setLeaves(await response.data)
            } catch(err) {
                if(err.response) {
                    console.log(err.response)
                } else {
                    console.log('Error: ', err.message)
                }
            }
        }
        // console.log('counter',absences)
        fetchLeaves()
    //   if(leaveList){
    //     setLeaves(leaveList)
    //   }
    }, [counter])
    return(
      <Container>
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between' }} >  
            <Typography variant="h6" component="span">
                Request
            </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <TableContainer component={Paper} sx={{height:450}} >
                <Table  aria-label="simple table">
                    <TableHead sx={{background: '#0ea5e9'}} align="center">
                    <TableRow >
                        <TableCell sx={{ color: '#ffffff'}}>Reason</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Date Stated</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Date Ended</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {leaves.map((row, index) => {
                        if(row.approved === false){
                            return(
                                <TableRow
                                    key={index}
                                    >
                                    <TableCell component="th" scope="row">
                                        {row.reason}
                                    </TableCell>
                                    <TableCell >{new Date(row.dateStarted).toLocaleDateString()}</TableCell>
                                    <TableCell >{new Date(row.dateEnded).toLocaleDateString()}</TableCell>
                                    <TableCell >
                                        <Button  variant="contained"
                                        onClick={() =>{
                                            const leaveData = {
                                                dateStarted: row.dateStarted, 
                                                dateEnded: row.dateEnded, 
                                                reason: row.reason, 
                                                approved: true}
                                            updateLeave(row.id, leaveData).then(res =>{
                                                console.log(res.request.status)
                                                dispatch(setCounter())
                                                setCount(counter+1)
                                            }).catch((res) => {
                                                // const statusCode = res.response.request.status
                                                console.log(res)
                                            })
                                        //     dispatch(removeDate({
                                        //     accountID: accountID,
                                        //     checkDate: 'requestLeave',
                                        //     index: index
                                        // }))
                                        //     dispatch(updateEmployee({accountID: accountID, data:row}))
                                    }}
                                        >
                                            Accept
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button sx={{background: 'red'}} variant="contained"
                                            onClick={() =>{
                                                deleteLeave(row.id).then(res =>{
                                                    console.log(res.request.status)
                                                    setCount(counter+1)
                                                    dispatch(setCounter())
                                                    }).catch((res) => {
                                                        // const statusCode = res.response.request.status
                                                        console.log(res)
                                                    })
                                            //     dispatch(removeDate({
                                            //     accountID: accountID,
                                            //     checkDate: 'requestLeave',
                                            //     index: index
                                            // }))
                                        }}
                                            >
                                            Decline
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                )
                        }
                    }
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box> 
    </Container>
    )
   
  }


  export const DisplayLeaveListTable = (props) =>{
    const dispatch = useDispatch()
    const {leaveList, employeeId} = props
    const [leaves, setLeaves] = useState([]);
    useEffect(() => {
       
        const fetchLeaves = async () => {
            try {
                const response = await getLeaves(employeeId);
                setLeaves(await response.data)
            } catch(err) {
                if(err.response) {
                    console.log(err.response)
                } else {
                    console.log('Error: ', err.message)
                }
            }
        }
        // console.log('counter',absences)
        if(employeeId){
            fetchLeaves()
        }
    //   if(leaveList){
    //     setLeaves(leaveList)
    //   }
    }, [employeeId])
    return(
      <Container>
        
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between' }} >  
            <Typography variant="h6" component="span">
                Leave List
            </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <TableContainer component={Paper}  >
                <Table  aria-label="simple table">
                    <TableHead sx={{background: '#0ea5e9'}} align="center">
                    <TableRow >
                        <TableCell sx={{ color: '#ffffff'}}>Reason</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Date Stated</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Date Ended</TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {leaves.map((row, index) => {
                        if(row.approved === true){
                            return(
                                <TableRow
                                key={index}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.reason}
                                    </TableCell>
                                    <TableCell >{new Date(row.dateStarted).toLocaleDateString()}</TableCell>
                                    <TableCell >{new Date(row.dateEnded).toLocaleDateString()}</TableCell>
                                </TableRow>
                            )}
                        }
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box> 
    </Container>
    )
   
  }

  export const DisplayRequestLeaveListTable = (props) =>{
    const dispatch = useDispatch()
    const {leaveList, employeeId} = props
    const [leaves, setLeaves] = useState([]);
    // const [counter, setCounter] = useState(0);
    const counter = useSelector(state => state.global.counter)

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await getLeaves(employeeId);
                setLeaves(await response.data)
            } catch(err) {
                if(err.response) {
                    console.log(err.response)
                } else {
                    console.log('Error: ', err.message)
                }
            }
        }
        // console.log('counter',absences)
        fetchLeaves()
    //   if(leaveList){
    //     setLeaves(leaveList)
    //   }
    }, [counter])
    return(
      <Container>
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'flex-end' }} >  
            <LeavesModal employeeId = {employeeId}/>
        </Box>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <TableContainer component={Paper}  >
                <Table  aria-label="simple table">
                    <TableHead sx={{background: '#0ea5e9'}} align="center">
                    <TableRow >
                        <TableCell sx={{ color: '#ffffff'}}>Reason</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Date Started</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Date Ended</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {leaves.map((row, index) => {
                        if(row.approved === false)
                        return(
                        <TableRow
                        key={index}
                        >
                        <TableCell component="th" scope="row">
                            {row.reason}
                        </TableCell>
                        <TableCell >{new Date(row.dateStarted).toLocaleDateString()}</TableCell>
                        <TableCell >{new Date(row.dateEnded).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Button sx={{background: 'red'}} variant="contained" startIcon={<Delete />}
                                onClick={() =>{
                                //     dispatch(removeDate({
                                //     accountID: accountID,
                                //     checkDate: 'requestLeave',
                                //     index: index
                                // }))
                                deleteLeave(row.id).then(res =>{
                                    console.log(res.request.status)
                                    dispatch(setCounter())
                                }).catch((res) => {
                                    // const statusCode = res.response.request.status
                                    console.log(res)
                                })
                            }}
                                >
                                    Delete
                            </Button>
                        </TableCell>
                        </TableRow>
                    )}
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box> 
    </Container>
    )
   
  }
