import { api } from "../api";

const tourApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllTours: builder.query({
        query: ({}) => ({
          url: "tourist/all-tours",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
    };
  },
});

export const { useGetAllToursQuery } = tourApi;