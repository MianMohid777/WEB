import { api } from "../api";

const uploadApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      upload: builder.mutation({
        query: (file) => {
          return {
            url: "Static/upload",
            method: "POST",
            body: file,
          };
        },
      }),
    };
  },
});

export const { useUploadMutation } = uploadApi;
