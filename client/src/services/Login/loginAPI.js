import { api } from "../api";

const loginAPI = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: ({ emailAddress, password, accessToken }) => ({
          url: "tourists/login",
          method: "POST",
          body: { emailAddress, password },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
    };
  },
});

const agencyLoginApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      agencyLogin: builder.mutation({
        query: ({ companyEmail, password, accessToken }) => ({
          url: "agencies/login",
          method: "POST",
          body: { companyEmail, password },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
    };
  },
});

export const { useLoginMutation } = loginAPI;
export const { useAgencyLoginMutation } = agencyLoginApi;
