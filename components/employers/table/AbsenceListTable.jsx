import _ from "lodash";
import {
    Container,
    Box,
    Button,
    Typography,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper,
    } from '@mui/material';
import { Delete} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import React, {useState, useEffect} from "react";
import { setCounter } from "../../../store/reducers/globalState";
// import {AbsentModal} from "../modal/AbsentModal"
import { getAbsence, deleteAbsence } from "../../../pages/api/employee";
import {AbsentModal} from "../modal/AbsentModal"


export const AbsenceListTable = (props) =>{
  const dispatch = useDispatch()
    const {absenceList, employeeId} = props
    const [absences, setAbsences] = useState([]);
    const counter = useSelector(state => state.global.counter)

    useEffect(() => {
      // console.log(employeeId)
      const fetchAbsences = async () => {
        try {
            const response = await getAbsence(employeeId);
            setAbsences(await response.data)
        } catch(err) {
            if(err.response) {
                console.log(err.response)
            } else {
                console.log('Error: ', err.message)
            }
        }
    }
    // console.log('counter',absences)
    fetchAbsences()
      // if(absenceList){
      //   setAbsences(absenceList)
      // }
    }, [counter, employeeId])
    return(
      <Container>
      <Box mb={1} mt={1} sx={{ display: 'flex', justifyContent: 'space-between' }} >  
          <Typography variant="h6" component="span">
              Absences
          </Typography>
          <AbsentModal employeeId ={employeeId}/>
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
              {absences.map((row, index) => (
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
                              deleteAbsence(row.id).then(res =>{
                                console.log(res.request.status)
                                dispatch(setCounter())
                            }).catch((res) => {
                                // const statusCode = res.response.request.status
                                console.log(res)
                            })
                            
                            }}>
                                <Delete sx={{color: 'red'}}/>
                            </Button>
                  </TableCell>
                  </TableRow>
              ))}
              </TableBody>
          </Table>
      </TableContainer>
      </Box> 
    </Container>
    )
  }

  export const DisplayAbsenceListTable = (props) =>{
    const dispatch = useDispatch()
      const {absenceList, employeeId} = props
      const [absences, setAbsences] = useState([]);
  
      useEffect(() => {
        // console.log(employeeId)
        const fetchAbsences = async () => {
          try {
              const response = await getAbsence(employeeId);
              setAbsences(await response.data)
          } catch(err) {
              if(err.response) {
                  console.log(err.response)
              } else {
                  console.log('Error: ', err.message)
              }
          }
      }
      // console.log('counter',absences)
      fetchAbsences()
        // if(absenceList){
        //   setAbsences(absenceList)
        // }
      }, [employeeId])
      return(
        <Container>
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between' }} >  
            <Typography variant="h6" component="span">
                Absences
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
                {absences.map((row, index) => (
                    <TableRow
                    key={index}
                    >
                    <TableCell component="th" scope="row">
                        {row.reason}
                    </TableCell>
                    <TableCell >{new Date(row.dateStarted).toLocaleDateString()}</TableCell>
                    <TableCell >{new Date(row.dateEnded).toLocaleDateString()}</TableCell>
                    
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box> 
      </Container>
      )
    }