import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  tagTypes: ["getPost"],
  endpoints: (builder) => ({
    // Get All Todo From Mongodb Database
    getTodoApi: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          params.append("priority", priority);
        }
        return {
          url: `/todos`,
          method: "GET",
          params,
        };
      },
      providesTags: ["getPost"],
    }),

    // this is for updating one documents.
    updateTodo: builder.mutation({
      query: ({ todoId, ...data }) => ({
        url: `/todo/${todoId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getPost"],
    }),
    // this is for updating one documents.
    deleteTodo: builder.mutation({
      query: ({ todoId }) => ({
        url: `/todo/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getPost"],
    }),

    // this is for is completed the todo task
    isCompletedTodo: builder.mutation({
      query: ({ todoId, isCompleted }) => ({
        url: `/todo/${todoId}`,
        method: "PUT",
        body: { isCompleted },
      }),
      invalidatesTags: ["getPost"],
    }),

    // this is for adding new todo task in the list.
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todo",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getPost"],
    }),
  }),
});

export const {
  useGetTodoApiQuery,
  useUpdateTodoMutation,
  useAddTodoMutation,
  useIsCompletedTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
