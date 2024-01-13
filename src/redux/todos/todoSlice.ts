import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

//  Todo Type
export type TTodo = {
  todoId?: string;
  title: string;
  description: string;
  priority: number;
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
      priority: 0,
      isCompleted: false,
    },
    {
      todoId: "2",
      title: "Todos 2",
      description: "This is todos description 2",
      priority: 2,
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
      console.log([state, action]);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;
