import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"








const initialState = {
    order: [],
    load: false,
    error: null





}

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {


        builder
            .addCase(orderpost.fulfilled, (state, action) => {
                state.order.push(action.payload.data)
                state.load = false


            }).addCase(orderget.fulfilled, (state, action) => {
                state.order = action.payload
                state.load = false


            })
            .addCase(orderget.pending, (state, action) => {

                state.load = true


            })

            .addCase(deliver.fulfilled, (state, action) => {
                const status = state.order.find((e) => e._id == action.payload.orderId)
                status.isDelivered = true

                state.load = false


            }).addCase(orderget.rejected, (state, action) => {
                state.error = true
                state.load = false


            })
            .addCase(ordergetuser.fulfilled, (state, action) => {
                state.order = action.payload
                state.load = false


            }).addCase(ordergetuser.pending, (state, action) => {

                state.load = true


            }).addCase(ordergetuser.rejected, (state, action) => {
                state.error = action.payload.message



            })
        builder.addCase(orderpost.pending, (state, action) => {

            state.load = true


        })
        builder.addCase(orderpost.rejected, (state, action) => {

            state.error = action.payload.message
            state.laod = false


        })






    },
})
export const orderpost = createAsyncThunk(
    'orders/post',

    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await axios.post("http://localhost:8090/placeOrder", thunkAPI, { withCredentials: true })
        return data.data

        // return data.data

    }
)
export const ordergetuser = createAsyncThunk(
    'orders/getuser',

    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await axios.post("http://localhost:8090/get-user-orders", thunkAPI, { withCredentials: true })
        console.log(data)

        return data.data
        // return data.data

    }
)
export const deliver = createAsyncThunk(
    'orders/deliver',

    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await axios.post("http://localhost:8090/deliver-order", thunkAPI, { withCredentials: true })
        console.log(data)

        return thunkAPI


    }
)
export const orderget = createAsyncThunk(
    'orders/get',

    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await axios.get("http://localhost:8090/get-all-orders", thunkAPI, { withCredentials: true })
        console.log(data)

        return data.data
        // return data.data

    }
)












// Action creators are generated for each case reducer function
export const { } = orderSlice.actions

export default orderSlice.reducer