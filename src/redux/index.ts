import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todos/todoSlice";
import { todoApi } from "./api/api";

export const todoStore = configureStore({
  reducer: {
    todos: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof todoStore.getState>;

export type AppDispatch = typeof todoStore.dispatch;
