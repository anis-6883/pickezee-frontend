import { routes } from "@/config/routes";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { signOut } from "next-auth/react";
import { RootState } from "../store";

export interface SerializedError {
  data: {
    status: boolean;
    message: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState).authSlice?.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("x-api-key", process.env.NEXT_PUBLIC_API_KEY as string);

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const loginEndpoints = ["login", "adminLogin"];
  if (
    !loginEndpoints?.includes(api?.endpoint) &&
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    await signOut({
      redirect: true,
      callbackUrl: routes.publicRoutes.login,
    });
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["admin-profile"],
});
