import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authSlice from "./authSlice"
import { categoriApi } from "./categoriApi";
import { bookingApi } from "./bookingApi";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [categoriApi.reducerPath]: categoriApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(),
    authApi.middleware,
    categoriApi.middleware,
    bookingApi.middleware,
    ]
})

export default reduxStore