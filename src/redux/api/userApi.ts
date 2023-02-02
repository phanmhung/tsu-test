import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
  }),
  endpoints: (builder) => ({
    getAll: builder.query<User[], void>({
      query: () => '/user',
    }),
    createUser: builder.mutation({
      query: (user: User) => ({
        url: '/user',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...rest }: User) => ({
        url: '',
        method: 'PUT',
        body: rest,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: '',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
