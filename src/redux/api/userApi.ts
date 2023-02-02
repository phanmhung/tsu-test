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
        url: `/user/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
    }),
    getUser: builder.query<User, string>({
      query: (id) => `/user/${id}`,
    }),
    getAllMail: builder.query<string[], void>({
      query: () => '/user',
      // loop through all users and return their emails
      transformResponse: (users: User[]) => users.map((user) => user.email),
    })
  }),
});

export const {
  useGetAllQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useGetAllMailQuery,
} = userApi;
