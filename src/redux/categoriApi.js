import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const categoriApi = createApi({
    reducerPath: "categoriApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/categori`, credentials: "include" }),
    tagTypes: ["categori"],
    endpoints: (builder) => {
        return {
            getallcategoryupdate: builder.query({
                query: (id) => `/getallupdatecategory/${id}`,
                transformResponse: (response) => response?.result, // Extract `result`
                providesTags: ["categori"],
            }),
            getallcategory: builder.query({
                query: (id) => {
                    return {
                        url: "/getallcategory",
                        method: "GET"
                    }
                },
                providesTags: ["categori"],
                transformResponse: (data) => data?.result || data,
            }),
            addcategori: builder.mutation({
                query: userData => {
                    return {
                        url: "/categori-add",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["categori"]
            }),
            updateCategori: builder.mutation({
                query: ({ id, categoryData }) => ({
                    url: `/update-categori/${id}`,
                    method: 'PUT',
                    body: categoryData,
                }),
                invalidatesTags: ["categori"],
            }),
            deleteCategori: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-categori/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["categori"]
            }),

        }
    }
})

export const {
    useAddcategoriMutation,
    useGetallcategoryupdateQuery,
    useGetallcategoryQuery,
    useDeleteCategoriMutation,
    useUpdateCategoriMutation
} = categoriApi
