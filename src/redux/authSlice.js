import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        hotel: JSON.parse(localStorage.getItem("hotel")) || null,
    },
    reducers: {
        invalidate: (state, { payload }) => {
            if (Array.isArray(payload)) {
                payload.forEach((item) => {
                    state[item] = false;
                });
            }
        }
    },
    extraReducers: (builder) =>
        builder
            .addMatcher(authApi.endpoints.registerAdminWaiter.matchFulfilled, (state, { payload }) => {
                if (payload) {
                    state.hotel = payload;
                    localStorage.setItem("hotel", JSON.stringify(payload));
                }
            })
            .addMatcher(authApi.endpoints.loginAdminWaiter.matchFulfilled, (state, { payload }) => {
                if (payload) {
                    state.hotel = payload;
                    localStorage.setItem("hotel", JSON.stringify(payload));
                }
            })
            .addMatcher(authApi.endpoints.logoutAdminWaiter.matchFulfilled, (state) => {
                state.hotel = null
                localStorage.removeItem("hotel");
            })
});

export const { invalidate } = authSlice.actions;
export default authSlice.reducer;
