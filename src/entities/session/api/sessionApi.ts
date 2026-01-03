import { LoginResponse } from "@/features/auth/model/types";
import { baseApi } from "@/shared/api/baseApi";

const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<LoginResponse, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const { useMeQuery } = sessionApi;
