import { baseApi } from "@/shared/api/baseApi";

import type { User } from "../model/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.query<User[], void>({
      query: () => "/users",
    }),
  }),
});

export const { useLoginQuery } = authApi;
