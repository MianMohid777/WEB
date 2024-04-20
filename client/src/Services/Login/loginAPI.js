import { api } from "../api";

const loginAPI = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: ({ emailAddress, password }) => ({
          url: "tourists/login",
          method: "POST",
          body: { emailAddress, password },
        }),
      }),
    };
  },
});

export const { useLoginMutation } = loginAPI;
