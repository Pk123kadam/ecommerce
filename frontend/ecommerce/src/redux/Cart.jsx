import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"








const initialState = {
    cart: [],
    status: '',

    // price: 0,




}

export const cartSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {

        // filteredBurger: (state, action) => {
        //     console.log(action.payload)
        //     state.filtered
        //         = action.payload

        // }

    },
    extraReducers: (builder) => {


        builder.addCase(addcart.fulfilled, (state, action) => {
            console.log(action.payload)

            if (action.payload.message == "unauthorized") {
                console.log("unnn")
                state.status = action.payload.message
                state.cart = []


            }
            else if (state.cart.find((e) => e.id == action.payload.user.id && e.
                userID == action.payload.user.
                    userID && e.variant == action.payload.user.variant)) {

                const data = state.cart.find((e) => e.id == action.payload.user.id && e.
                    userID == action.payload.user.
                        userID && e.variant == action.payload.user.variant)
                console.log(data)
                data.quantity = Number(action.payload.user.quantity) + data.quantity

                state.status = ""

            }



            else {
                console.log("else")


                state.cart.push(action.payload.user),






                    state.status = ""
            }
        })
            .addCase(cartDelete.fulfilled, (state, action) => {
                console.log(action.payload)



                state.cart = state.cart.filter((e) => e._id !== action.payload._id)





                state.status = ""
            })
            .addCase(cartDel.fulfilled, (state, action) => {
                console.log(action.payload)



                state.cart = state.cart.filter((e) => e.userID !== action.payload)





                state.status = ""
            })
            .addCase(getcart.fulfilled, (state, action) => {
                console.log(action.payload)

                if (action.payload.message == "unauthorized") {
                    state.cart = []

                    state.status = action.payload.message


                } else {
                    // state.price = action.payload.cart[0].price / action.payload.cart[0].quantity
                    state.cart = action.payload.cart
                    state.status = ""


                }


            }).addCase(updatecart.fulfilled, (state, action) => {





                if (action.payload.message == "increment") {
                    console.log(action.payload)

                    state.cart.map((e) => {
                        if (e._id == action.payload.data._id) {


                            return e.quantity += 1,
                                e.price += action.payload.data.single



                        }
                    })
                    state.status = ""


                }


                if (action.payload.message == "decrement") {
                    console.log(state.amount)
                    state.cart.map((e) => {
                        if (e._id == action.payload.data._id) {
                            return e.quantity -= 1,
                                e.price -= action.payload.data.single

                        }
                    })


                }
                state.status = ""




            })

            .addCase(addcart.pending, (state, action) => {
                state.status = "pending"


            })
            .addCase(addcart.rejected, (state, action) => {
                state.status = "error"

            })
            .addCase(getcart.pending, (state, action) => {
                state.status = "pending"


            })
            .addCase(getcart.rejected, (state, action) => {
                state.status = "error"

            })
            .addCase(cartDelete.pending, (state, action) => {
                state.status = "pending"


            })
            .addCase(cartDelete.rejected, (state, action) => {
                state.status = "error"

            }).addCase(updatecart.pending, (state, action) => {
                state.status = "pending"


            })
            .addCase(updatecart.rejected, (state, action) => {
                state.status = "error"

            })




    },
})
export const addcart = createAsyncThunk(
    'cart/add',
    async (thunkAPI) => {
        console.log(thunkAPI)

        // const data = await axios.post("http://localhost:8090/addCart", thunkAPI, { withCredentials: true })
        // console.log(data)

        // return data.data.user

        const data = await fetch(`http://localhost:8090/addCart`, {
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

export const cartDelete = createAsyncThunk(
    'cart/delete',
    async (thunkAPI) => {
        console.log(thunkAPI)

        const data = await axios.delete("http://localhost:8090/cartDelete/" + thunkAPI._id, { withCredentials: true })
        console.log(data)
        return thunkAPI



    }
)
export const cartDel = createAsyncThunk(
    'cart/deleteuser',
    async (thunkAPI) => {
        console.log(thunkAPI)

        const data = await axios.delete("http://localhost:8090/cartdel/" + thunkAPI, { withCredentials: true })
        console.log(data)
        return thunkAPI



    }
)
export const updatecart = createAsyncThunk(
    'cart/update',
    async (thunkAPI) => {
        console.log(thunkAPI)

        const data = await axios.put("http://localhost:8090/updateCart/" + thunkAPI.data._id, thunkAPI, { withCredentials: true })
        console.log(data)
        return thunkAPI



    }
)

export const getcart = createAsyncThunk(
    'cart/get',
    async (thunkAPI) => {
        console.log(thunkAPI)
        // const data = await axios.get(`http://localhost:8090/cart/${thunkAPI}`, { withCredentials: true })

        // return data

        const data = await fetch(`http://localhost:8090/cart/${thunkAPI}`, {
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




// Action creators are generated for each case reducer function
export const { } = cartSlice.actions

export default cartSlice.reducer