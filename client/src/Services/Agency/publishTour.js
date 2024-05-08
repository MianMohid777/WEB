import { api } from "../api";

const tourApi = api.injectEndpoints({
    endpoints: (builder) => {
      return {
        tourPublish: builder.mutation({
          query: (tourInfo) => {
            console.log("API tourInfo:", tourInfo); // Print tourInfo here
            return {
              url: "/agencies/tours/publish",
              method: "POST",
              body: tourInfo,
              headers: {
                "Content-Type": "application/json",
              },
            };
          },
        }),
      };
    },
  });
  
  export const { useTourPublishMutation } = tourApi;
  