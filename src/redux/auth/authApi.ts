import { apiSlice } from "@/redux/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => {
        return {
          url: `/api/secret-root/admin/auth/login`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["admin-profile"],
    }),
  }),
});

export const { useAdminLoginMutation } = authApi;
