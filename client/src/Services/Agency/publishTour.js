import { api } from "../api";

const tourApi = api.injectEndpoints({
    endpoints: (builder) => {
      return {
        tourPublish: builder.mutation({
          query: (tourInfo, id, accessToken ) => {
            console.log("API tourInfo:", tourInfo);
            return {
              url: "agencies/current-agency/publish-tour/"+ id,
              method: "POST",
              body: tourInfo,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            };
          },
        }),
      };
    },
  });
  
  export const { useTourPublishMutation } = tourApi;
  