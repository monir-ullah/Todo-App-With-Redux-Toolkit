import { Button } from "@/components/ui/button";
import { Todo } from "./Todo";
import { AddAndUpdateTodoBtn } from "./AddAndUpdateTodoBtn";
import { useAppSelector } from "../../../redux/hooks";
import { TTodo } from "@/redux/todos/todoSlice";

export const TodosContainer = () => {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <div className="mt-5 ">
      <div className="flex justify-between mt-10">
        <AddAndUpdateTodoBtn key={Math.random()} value={"addNewTodo"} />
        <Button className="px-4 py-6 bg-gray-600 hover:bg-gray-500">
          Filter By
        </Button>
      </div>
      <div className="p-10 mt-10 space-y-5 border-2 border-red-300 rounded-md">
        {todos.length === 0 ? "No Task Found" : null}
        {todos.map((todo: TTodo) => (
          <Todo key={todo.todoId} todo={todo} />
        ))}
      </div>
    </div>
  );
};
