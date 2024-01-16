/* eslint-disable @typescript-eslint/no-explicit-any */
import { Todo } from "./Todo";
import { AddAndUpdateTodoBtn } from "./AddAndUpdateTodoBtn";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { useAppDispatch } from "../../../redux/hooks";
// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
// import { filterTodo } from "@/redux/todos/todoSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useGetTodoApiQuery } from "@/redux/api/api";
// import { useFilterTodoQuery, useGetTodoApiQuery } from "@/redux/api/api";

export const TodosContainer = () => {
  // For Local State
  // const todos = useAppSelector((state) => state.todos.todos);
  const [priority, setPriority] = useState("");
  // const dispatch = useAppDispatch();const [filterTodo] = useFilterTodoMutation();

  // For server state
  const { isLoading, data: todos, error } = useGetTodoApiQuery(priority);
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    console.log(error);
    return;
  }

  return (
    <div className="mt-5 ">
      <div className="flex justify-between mt-10">
        <AddAndUpdateTodoBtn key={Math.random()} value={"addNewTodo"} />

        <Select onValueChange={(value) => setPriority(value)}>
          <SelectTrigger className="w-[180px] blur:border-none border-0 px-4 py-6 bg-blue-400 hover:bg-blue-600 text-white focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Filter Task" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter Task By Priority</SelectLabel>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="default">Default</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="p-10 mt-10 space-y-5 border-2 border-red-300 rounded-md">
        {todos.length === 0 ? "No Task Found" : null}
        {todos.map((todo: any) => (
          <Todo key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
