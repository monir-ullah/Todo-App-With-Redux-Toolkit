import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

//  Todo Type
export type TTodo = {
  todoId?: string;
  title: string;
  description: string;
  priority: "high" | "low" | "medium";
  isCompleted?: boolean;
};
// Type of initial Object for create Slice
type TInitialState = {
  todos: TTodo[];
};

// initial State Object from the create Slice
const initialState: TInitialState = {
  todos: [
    {
      todoId: "1",
      title: "Todos",
      description: "This is todos description",
      priority: "high",
      isCompleted: false,
    },
    {
      todoId: "2",
      title: "Todos 2",
      description: "This is todos description 2",
      priority: "low",
      isCompleted: true,
    },
  ],
};

// create todo slice
export const todoSlice = createSlice({
  name: "todoApplication",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        ...action.payload,
        isCompleted: false,
        todoId: String(new Date().getTime()),
      });
      state.todos.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const removeTodoState = state.todos.filter(
        (todo) => todo.todoId !== action.payload
      );
      state.todos = removeTodoState;
    },
    taskCompleted: (state, action) => {
      const targetIndex = state.todos.findIndex(
        (item) => item.todoId === action.payload.todoId
      );
      if (targetIndex === -1) {
        return;
      }
      state.todos[targetIndex].isCompleted = action.payload.isCompleted;
      state.todos.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    },
    updateTodo: (state, action) => {
      const targetIndex = state.todos.findIndex(
        (item) => item.todoId === action.payload.todoId
      );
      if (targetIndex === -1) {
        return;
      }
      state.todos[targetIndex] = action.payload;
    },
  },
});

export const { addTodo, removeTodo, updateTodo, taskCompleted } =
  todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;
