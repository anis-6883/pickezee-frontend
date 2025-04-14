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
    userSignUp: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v1/auth/register`,
          method: "POST",
          body: data,
        };
      },
    }),
    userResendOtp: builder.query({
      query: () => `/api/v1/auth/resend-otp`,
    }),
    userVerifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v1/auth/verify-otp`,
          method: "POST",
          body: data,
        };
      },
    }),
    userLogin: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v1/auth/login`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user-profile"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useUserSignUpMutation,
  useUserVerifyOtpMutation,
  useLazyUserResendOtpQuery,
  useUserLoginMutation,
} = authApi;
