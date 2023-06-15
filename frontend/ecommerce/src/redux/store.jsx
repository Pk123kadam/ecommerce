import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './slice'
import burgerSlice from './addburger'
import usersSlice from './users'
import cartSlice from './Cart'
import order from "./Order"

export const store = configureStore({
    reducer: {
        login: loginSlice,
        burger: burgerSlice,
        users: usersSlice,
        cart: cartSlice,
        order: order
    },
})

