import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/apiEndPoint",
                        method: "GET"
                    }
                },
                providesTags: ["auth"]
            }),
            registerAdminWaiter: builder.mutation({
                query: userData => {
                    return {
                        url: "/register-adminwaiter",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            loginAdminWaiter: builder.mutation({
                query: userData => {
                    return {
                        url: "/login-adminwaiter",
                        method: "POST",
                        body: userData,
                        credentials: "include"
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: (data) => {
                    localStorage.setItem("hotel", JSON.stringify(data.result));
                    return data.result;
                },
            }),
            logoutAdminWaiter: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout-adminwaiter",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            resendOtp: builder.mutation({
                query: userData => {
                    return {
                        url: "/resend-otp",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            verifyOtp: builder.mutation({
                query: userData => {
                    return {
                        url: "/verify-otp",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),

        }
    }
})

export const {
    useRegisterAdminWaiterMutation,
    useLoginAdminWaiterMutation,
    useLogoutAdminWaiterMutation,
    useResendOtpMutation,
    useVerifyOtpMutation
} = authApi
