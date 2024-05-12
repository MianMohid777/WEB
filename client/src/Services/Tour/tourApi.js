import { api } from "../api";

const tourApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTours: builder.query({
        query: () => ({
          url: "tourists/current-home/all-tours",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }),
    };
  },
});

export const { useGetToursQuery } = tourApi;
