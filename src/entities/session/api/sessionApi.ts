import { LoginResponse } from "@/features/auth";
import { baseApi } from "@/shared/api/baseApi";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<LoginResponse, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const { useMeQuery } = sessionApi;
