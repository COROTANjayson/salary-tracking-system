import { configureStore } from "@reduxjs/toolkit";
import globalReducer from './reducers/globalState'

// import 
export const store =  configureStore({
    reducer: {
        global: globalReducer,
    }
})