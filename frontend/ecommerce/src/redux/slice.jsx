import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from "axios"









const initialState = {
    loginstatus: "",
    updatestatus: "",

    user: {},
    updateuser: {}




}

export const loginSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        builder.addCase(loginuser.fulfilled, (state, action) => {

            console.log(action)
            if (action.payload.message == "invalid credentials") {
                console.log("ko")
                state.user = {}

            }
            else if (action.payload.message == "user not found") {
                console.log("ko")
                state.user = {}

            } else {
                state.user = action.payload.data
            }
            state.loginstatus = action.payload.message




        }).addCase(verifyuser.fulfilled, (state, action) => {

            console.log(action.payload)
            state.loginstatus = action.payload.status
            if (action.payload.message == "unauthorized") {


                state.user = {}




            } else {
                state.user = action.payload.user

                state.updatestatus = ""
            }


        })
            .addCase(updateuser.fulfilled, (state, action) => {

                const { id, formData } = action.payload
                console.log(id, formData)




                state.updateuser = { ...state.user, username: formData.get("username") }
                console.log(state.user)





            })
            .addCase(getuser.fulfilled, (state, action) => {

                console.log(action.payload)
                if (action.payload.message == "unauthorized") {
                    console.log("un")
                    state.updateuser = {}


                } else {
                    state.updateuser = { ...action.payload.user }


                }




            })

            .addCase(logoutuser.fulfilled, (state, action) => {

                console.log(action.payload)
                state.loginstatus = action.payload.message
                state.user = {},
                    state.updateuser = {}


            })
            .addCase(deleteuser.fulfilled, (state, action) => {

                state.updateuser = {}



            })

            .addCase(loginuser.pending, (state, action) => {
                state.loginstatus = "pending"


            })
            .addCase(loginuser.rejected, (state, action) => {
                state.loginstatus = action.payload.message

            })
            .addCase(logoutuser.pending, (state, action) => {


            })
            .addCase(logoutuser.rejected, (state, action) => {
                state.loginstatus = action.payload.message

            })
        // .addCase(updateuser.pending, (state, action) => {
        //     state.updatestatus = "pending"


        // })

        // .addCase(updateuser.rejected, (state, action) => {

        //     const { id, data, status } = action.payload
        //     state.updatestatus = status


        // })


    },
})
export const updateuser = createAsyncThunk(
    'users/update',

    async (thunkAPI) => {
        console.log(thunkAPI)
        const { id, formData } = thunkAPI

        const datas = await axios.put(`http://localhost:8090/update/${id}`, formData, { withCredentials: true })
        console.log(datas)
        return thunkAPI

    }
)

export const deleteuser = createAsyncThunk(
    'user/delete',
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
export const getuser = createAsyncThunk(
    'user/get',
    async (thunkAPI) => {
        console.log(thunkAPI)
        // const data = await axios.get("http://localhost:8090/user/" + thunkAPI, { withCredentials: true })
        // console.log(data)
        // return data.data.user

        const data = await fetch("http://localhost:8090/user/" + thunkAPI, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },


        }

        )
        const res = await data.json()

        console.log(res)
        return res







    }
)

// export const updateuser = createAsyncThunk(
//     'user/update',
//     async (thunkAPI) => {
//         console.log(thunkAPI)
//         const { id, data } = thunkAPI
//         const datas = await fetch(`http://localhost:8090/update/${id}`, {
//             method: "PUT",
//             mode: 'cors',
//             credentials: 'include',

//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify(data)

//         }

//         )
//         const res = await datas.json()
//         const up = { ...thunkAPI, status: res.message }
//         console.log(up)
//         return up


//     }
// )
export const loginuser = createAsyncThunk(
    'users/login',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await fetch("http://localhost:8090/login", {
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
        console.log(res)
        return res


    }
)
export const logoutuser = createAsyncThunk(
    'users/logout',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await fetch("http://localhost:8090/logout", {
            method: "GET",
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
export const verifyuser = createAsyncThunk(
    'users/verify',
    async (thunkAPI) => {
        console.log(thunkAPI)
        const data = await fetch("http://localhost:8090/verify", {
            method: "GET",
            mode: 'cors',
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },


        }

        )
        const res = await data.json()
        console.log(res.status)
        console.log(res)
        return res




    }
)



// Action creators are generated for each case reducer function
export const { } = loginSlice.actions

export default loginSlice.reducer