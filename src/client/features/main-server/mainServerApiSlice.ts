import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { ListContentServerResponse } from "@shared/types/response";

export const mainServerApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5173/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      } else {
        console.error('No token available');
      }
    }
  }),
  reducerPath: 'mainServerApi',
  tagTypes: ['ContentServers'],
  endpoints: build => ({
    getContentServers: build.query<ListContentServerResponse[], void>({
      query: () => '/content-servers/list',
    })
  }),
});

export const { useGetContentServersQuery } = mainServerApiSlice;
