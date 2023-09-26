import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartReducer";


const store = configureStore({
    reducer:{
        Cart:CartSlice
    }
})

export default store