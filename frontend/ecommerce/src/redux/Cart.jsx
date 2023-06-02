import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"








const initialState = {
    cart: [],
    status: '',
    total: 0,
    price: 0,




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
            console.log(action.payload.amount)



            state.cart.push(action.payload),
                state.total += Number(action.payload.price),





                state.status = ""
        })
            .addCase(cartDelete.fulfilled, (state, action) => {
                console.log(action.payload)



                state.cart = state.cart.filter((e) => e._id !== action.payload._id)
                state.total -= Number(action.payload.price)





                state.status = ""
            }).addCase(getcart.fulfilled, (state, action) => {
                console.log(action.payload)

                if (action.payload.message == "unauthorized") {
                    state.cart = []


                } else {
                    state.price = action.payload.cart[0].price / action.payload.cart[0].quantity
                    state.cart = action.payload.cart
                    state.total = action.payload.cart.reduce((acc, cr) => acc + Number(cr.price), 0)

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
                state.total = state.cart.reduce((acc, cr) => acc + Number(cr.price), 0)




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

        const data = await axios.post("http://localhost:8090/addCart", thunkAPI, { withCredentials: true })
        console.log(data)
        // return data.data.user
        return thunkAPI


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