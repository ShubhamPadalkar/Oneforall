import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const _ = require('lodash')

export const getProducts = createAsyncThunk(
    'Cart/getproducts',
    async (data,{rejectWithValue,dispatch,getState}) => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            return response.json()
        } catch (error) {
            rejectWithValue(error)
        }
    } 
    )

const Cartslice = createSlice({
    name:'Cartdata',
    initialState:{products:[],loading:false,errorText:undefined,selectedProducts:[]},
    reducers:{
        selectProduct :(state,action) => {
            let oldProducts = state.selectedProducts
            oldProducts.push(action.payload)
            state.selectedProducts = oldProducts
        },
        removeProduct : (state,action) => {
            let oldProducts = state.selectedProducts
            let removedProductlist = _.reject(oldProducts,['id',action.payload])
            state.selectedProducts = removedProductlist
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state,action)=>{
            state.loading = true;
            state.errorText = undefined
        }),
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            state.products = action.payload;
            state.loading = false;
            state.errorText = undefined
        }),
        builder.addCase(getProducts.rejected,(state,action)=>{
            state.products = undefined;
            state.loading = false;
            state.errorText = action.payload
        })
    }
})


export const {selectProduct, removeProduct} = Cartslice.actions

export default Cartslice.reducer