import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"








const initialState = {
    burger: [],
    status: '',
    filtered: []



}

export const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        filteredBurger: (state, action) => {
            console.log(action.payload)
            state.filtered
                = action.payload

        }
    },
    extraReducers: (builder) => {


        builder.addCase(getburger.fulfilled, (state, action) => {

            console.log(action.payload)
            state.burger = action.payload
            state.filtered = action.payload
            state.status = ""
        }).addCase(addburger.fulfilled, (state, action) => {

            console.log(action)
            state.burger.push(action.payload)
            state.status = "added successfully"
        })

            .addCase(addburger.pending, (state, action) => {
                state.status = "pending"


            })
            .addCase(addburger.rejected, (state, action) => {
                state.status = "error"

            })
            .addCase(getburger.pending, (state, action) => {
                state.status = "pending"


            })
            .addCase(getburger.rejected, (state, action) => {
                state.status = "error"

            })



    },
})
export const addburger = createAsyncThunk(
    'burger/add',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await axios.post("http://localhost:8090/addProduct", thunkAPI, { withCredentials: true })
        return data.data.user

    }
)
export const getburger = createAsyncThunk(
    'burger/get',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await axios.get("http://localhost:8090/products", { withCredentials: true })
        return data.data.user
    }
)




// Action creators are generated for each case reducer function
export const { filteredBurger } = burgerSlice.actions

export default burgerSlice.reducer