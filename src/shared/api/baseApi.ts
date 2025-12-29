import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
