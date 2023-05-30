import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './slice'
import burgerSlice from './addburger'
import usersSlice from './users'
import cartSlice from './Cart'

export const store = configureStore({
    reducer: {
        login: loginSlice,
        burger: burgerSlice,
        users: usersSlice,
        cart: cartSlice
    },
})

