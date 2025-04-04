import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/booking` }),
    tagTypes: ["Booking"],
    endpoints: (builder) => ({


        getAllBookings: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["Booking"],
        }),

        getBookingById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: ["Booking"],
        }),

        createBooking: builder.mutation({
            query: (newBooking) => ({
                url: "/create",
                method: "POST",
                body: newBooking,
            }),
            invalidatesTags: ["Booking"],
        }),

        updateBooking: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/${id}`,
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: ["Booking"],
        }),

        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Booking"],
        }),
    }),
});

export const {
    useGetAllBookingsQuery,
    useGetBookingByIdQuery,
    useCreateBookingMutation,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
} = bookingApi;
