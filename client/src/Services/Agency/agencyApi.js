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

const deleteApplicationApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      deleteApplication: builder.mutation({
        query: ({ id, accessToken }) => ({
          url: `admin/current-admin/applications/${id}`,
          method: "DELETE",
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

const getAgencyApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAgency: builder.query({
        query: ({ accessToken }) => ({
          url: "agencies/current-agency",
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

const getAllToursApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllTours: builder.query({
        query: ({ id, accessToken }) => ({
          url: `agencies/current-agency/tours/${id}`,
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

const updateTourStatus = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      updateTourStatus: builder.mutation({
        query: ({ id, accessToken }) => ({
          url: `agencies/current-agency/tours/${id}`,
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

const agencyProfileApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAgencyProfile: builder.query({
        query: (id, accessToken) => ({
          url: `/agencies/current-agency/profile/${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),
      updateAgencyProfile: builder.mutation({
        query: ({ id, accessToken, updatedData }) => ({
          url: `/agencies/current-agency/profile/${id}`,
          method: "PUT", // Assuming you are using PUT method for updating
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedData),
        }),
      }),
    };
  },
});



// const agencyProfileApi = api.injectEndpoints({
//   endpoints: (builder) => {
//     return {
//       getAgencyProfile: builder.query({
//         queryFn: async ({ id, accessToken }) => {
//           const response = await fetch(`/agencies/current-agency/profile/${id}`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error("Failed to fetch agency profile");
//           }

//           return response.json();
//         },
//       }),
//       updateAgencyProfile: builder.mutation({
//         queryFn: async ({ id, accessToken, updatedData }) => {
//           const response = await fetch(`/agencies/current-agency/profile/${id}`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${accessToken}`,
//             },
//             body: JSON.stringify(updatedData),
//           });

//           if (!response.ok) {
//             throw new Error("Failed to update agency profile");
//           }

//           return response.json();
//         },
//       }),
//     };
//   },
// });


export const { useGetAgencyProfileQuery, useUpdateAgencyProfileMutation } = agencyProfileApi;
export const { useGetAllAgencyQuery } = agencyGetAllApi;
export const { useGetAdminQuery } = getAdminApi;
export const { useGetAgencyQuery } = getAgencyApi;
export const { useUpdateStatusMutation } = updateStatusApi;
export const { useLogoutMutation } = logoutApi;
export const { useDeleteApplicationMutation } = deleteApplicationApi;
export const { useGetAllToursQuery } = getAllToursApi;
export const { useUpdateTourStatusMutation } = updateTourStatus;
