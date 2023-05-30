import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"








const initialState = {
    users: [],
    status: "",
    registerstatus: '',
    updatestatus: '',
    deletestatus: '',
    user: {}




}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {


        builder.addCase(getusers.fulfilled, (state, action) => {

            console.log(action.payload)
            state.users = action.payload
            state.status = "",
                state.registerstatus = '',
                state.updatestatus = '',
                state.deletestatus = ''


        })
            .addCase(registeruser.fulfilled, (state, action) => {

                console.log(action.payload)
                state.users.push(action.payload.user)
                state.registerstatus = action.payload.message
            })
            .addCase(updateuser.fulfilled, (state, action) => {

                const { id, data, status } = action.payload
                console.log(id, data)
                state.updatestatus = status
                const update = state.users.find((e) => e._id == id)
                update.username = data.username,
                    update.email = data.email



            })
            .addCase(deleteuser.fulfilled, (state, action) => {

                console.log(action.payload)
                const { id, status } = action.payload
                state.users = state.users.filter((e) => e._id !== id)
                state.deletestatus = status
            })

            .addCase(getusers.pending, (state, action) => {
                state.status = "pending"


            })
            .addCase(getusers.rejected, (state, action) => {
                state.status = "error"

            })
            .addCase(registeruser.pending, (state, action) => {
                state.registerstatus = "pending"


            })
            .addCase(registeruser.rejected, (state, action) => {
                state.registerstatus = action.payload.message

            })
            .addCase(updateuser.pending, (state, action) => {
                state.updatestatus = "pending"


            })
            .addCase(updateuser.rejected, (state, action) => {
                console.log("hi")
                state.updatestatus = action.payload.message

            })
            .addCase(deleteuser.pending, (state, action) => {
                state.deletestatus = "pending"


            })
            .addCase(deleteuser.rejected, (state, action) => {
                console.log("hi")
                state.deletestatus = action.payload.message

            })



    },
})
export const registeruser = createAsyncThunk(
    'users/register',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await fetch("http://localhost:8090/register", {
            method: "POST",
            mode: 'cors',
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(thunkAPI)

        }

        )
        const res = await data.json()
        return res



    }
)
export const updateuser = createAsyncThunk(
    'users/update',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const { id, data } = thunkAPI
        const datas = await fetch(`http://localhost:8090/update/${id}`, {
            method: "PUT",
            mode: 'cors',
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)

        }

        )
        const res = await datas.json()
        const up = { ...thunkAPI, status: res.message }
        console.log(up)
        return up


    }
)
export const deleteuser = createAsyncThunk(
    'users/delete',
    async (thunkAPI) => {
        console.log(thunkAPI)

        const datas = await fetch(`http://localhost:8090/delete/${thunkAPI}`, {
            method: "DELETE",
            mode: 'cors',
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

        }

        )
        const res = await datas.json()
        const del = { id: thunkAPI, status: res.message }
        console.log(del)
        return del


    }
)
export const getusers = createAsyncThunk(
    'users/get',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await axios.get("http://localhost:8090/users", { withCredentials: true })
        console.log(data)
        return data.data.user
    }
)





// Action creators are generated for each case reducer function
export const { } = usersSlice.actions

export default usersSlice.reducer