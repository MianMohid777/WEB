import { api } from "../api";

const agencyGetAllApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllAgency: builder.query({
        query: ({ accessToken }) => ({
          url: "admin/current-admin/applications",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
    };
  },
});

const getAdminApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAdmin: builder.query({
        query: ({ accessToken }) => ({
          url: "admin/current-admin",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
    };
  },
});

const updateStatusApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      updateStatus: builder.mutation({
        query: ({ id, accessToken }) => ({
          url: `admin/current-admin/applications/${id}`,
          method: "PUT",
          body: {},
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
    };
  },
});

const logoutApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      logout: builder.mutation({
        query: ({ accessToken }) => ({
          url: "admin/current-admin/logout",
          method: "POST",
          body: {},
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
    };
  },
});
export const { useGetAllAgencyQuery } = agencyGetAllApi;
export const { useGetAdminQuery } = getAdminApi;
export const { useUpdateStatusMutation } = updateStatusApi;
export const { useLogoutMutation } = logoutApi;
