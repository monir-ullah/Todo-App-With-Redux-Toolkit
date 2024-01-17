/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
// import { useAppDispatch } from "@/redux/hooks";
// import { removeTodo, taskCompleted } from "@/redux/todos/todoSlice";
import { MouseEvent } from "react";
import { AddAndUpdateTodoBtn } from "./AddAndUpdateTodoBtn";
import {
  useDeleteTodoMutation,
  // useGetTodoApiQuery,
  useIsCompletedTodoMutation,
} from "@/redux/api/api";

export const Todo = ({ todo }: any) => {
  const { todoId, title, description, isCompleted } = todo;
  const [isCompletedTodo] = useIsCompletedTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  // const dispatch = useAppDispatch();

  const handleDeleteTodo = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // dispatch(removeTodo(todoId));

    deleteTodo({ todoId });
  };

  const handleIsCompleted = () => {
    // dispatch(taskCompleted({ todoId, isCompleted: !isCompleted }));
    //  For server
    isCompletedTodo({ todoId, isCompleted: !isCompleted });
  };

  return (
    <div className="flex items-center justify-between p-5 border-2 border-red-300 rounded-md">
      <div className="w-2/6 space-x-2 text-left">
        <label htmlFor={todoId} className="text-xl font-medium">
          <input
            type="checkbox"
            name={todoId}
            id={todoId}
            defaultChecked={isCompleted}
            onChange={handleIsCompleted}
            className="mx-1.5	"
          />
          {title}
        </label>
      </div>
      <div className="w-2/6 text-left">
        <span>
          {isCompleted ? (
            <div className="flex space-x-3 text-green-400">
              <p className="">
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              </p>
              <p>Done</p>
            </div>
          ) : (
            <div className="flex space-x-3 text-red-400">
              {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              <p>Pending</p>
            </div>
          )}
        </span>
      </div>
      <p className="w-4/6 text-center">{description}</p>
      <div className="w-1/4 space-x-4">
        <Button
          onClick={handleDeleteTodo}
          className="px-4 py-6 bg-red-400 hover:bg-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
        <AddAndUpdateTodoBtn
          key={Math.random()}
          value={"updateTodo"}
          todoId={todoId}
        />
      </div>
    </div>
  );
};
