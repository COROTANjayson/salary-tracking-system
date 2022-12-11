import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedIndex: 0,
    counter: 0,
    adminDrawerIndex: 0,
    employernDrawerIndex: 0,
}

export const globalStore = createSlice({
    name: 'global',
    initialState: initialState,
    reducers: {
        setSelectedIndex: (state, action) => {
            state.selectedIndex = action.payload
        },
        setAdminDrawerIndex: (state, action) => {
            const endpoint = action.payload
            console.log(endpoint)
            if (endpoint === "/dashboard") {
                state.adminDrawerIndex = 0
            } else if (endpoint === "/admin/companies") {
                state.adminDrawerIndex = 1
            } else if (endpoint === "/admin/employers") {
                state.adminDrawerIndex = 2
            } else if (endpoint === "/admin/users") {
                state.adminDrawerIndex = 3
            }else if (endpoint === "/employer/form") {
                state.adminDrawerIndex = 4
            } else if (endpoint === "/company/form") {
                state.adminDrawerIndex = 5
            }



        },
        setEmployerDrawerIndex: (state, action) => {
            const endpoint = action.payload
            console.log(endpoint)
            if (endpoint === "/dashboard") {
                state.employernDrawerIndex = 0
            } else if (endpoint === "/employee") {
                state.employernDrawerIndex = 1
            } else if (endpoint === "/employee/request") {
                state.employernDrawerIndex = 2
            } 



        },
        setCounter: (state) => {
            state.counter += 1
        }
    }
})

export const { setSelectedIndex, setCounter, setAdminDrawerIndex, setEmployerDrawerIndex } = globalStore.actions

export default globalStore.reducer