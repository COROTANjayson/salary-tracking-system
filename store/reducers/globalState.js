import { createSlice } from "@reduxjs/toolkit";




const accountList = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('accountList')): null
const data = accountList !== null||undefined ? accountList : []

const initialState = {
    selectedIndex: 0,
    counter: 0,
}

export const globalStore = createSlice({
    name: 'global',
    initialState: initialState,
    reducers: {
        setSelectedIndex: (state, action) => {
            state.selectedIndex = action.payload
        },
        setCounter: (state) => {
            state.counter += 1 
        }
    }
})

export const {setSelectedIndex, setCounter} = globalStore.actions

export default globalStore.reducer