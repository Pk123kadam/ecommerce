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
        }).addCase(delburger.fulfilled, (state, action) => {
            console.log(action.payload)

            state.burger = state.burger.filter((e) => e._id !== action.payload)
            state.status = "deleted successfully"
        }).addCase(updburger.fulfilled, (state, action) => {

            console.log(action)
            const data = state.burger.find((e) => e._id == action.payload.id)
            data.name = action.payload.data.name,
                data.category = action.payload.data.category,
                data.image = action.payload.data.image,
                data.description = action.payload.data.description,
                data.prices = action.payload.data.prices,
                data.variants = action.payload.data.variants,

                state.status = "updated successfully"
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

            }).addCase(delburger.pending, (state, action) => {
                state.status = "pending"


            })
            .addCase(delburger.rejected, (state, action) => {
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
export const updburger = createAsyncThunk(
    'burger/upd',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await axios.put("http://localhost:8090/updateProduct/" + thunkAPI.id, thunkAPI.data, { withCredentials: true })
        return thunkAPI

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
export const delburger = createAsyncThunk(
    'burger/del',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await axios.delete("http://localhost:8090/productDelete/" + thunkAPI, { withCredentials: true })
        return thunkAPI
    }
)






// Action creators are generated for each case reducer function
export const { filteredBurger } = burgerSlice.actions

export default burgerSlice.reducer