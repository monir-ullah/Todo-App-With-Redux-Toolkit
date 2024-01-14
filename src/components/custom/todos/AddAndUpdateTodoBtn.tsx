/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch } from "@/redux/hooks";
import { addTodo, updateTodo } from "@/redux/todos/todoSlice";
import { DialogClose } from "@radix-ui/react-dialog";
import { FormEvent, useState } from "react";
import { ZodError, z } from "zod";

export function AddAndUpdateTodoBtn(props: any) {
  const [btnState] = useState(props.value);
  const [todoId] = useState(props.todoId ? props.todoId : "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Task Priority");
  const dispatch = useAppDispatch();

  const todoTaskValidation = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    priority: z.enum(["high", "low", "medium"]),
  });
  const handleSubmitBtn = (e: FormEvent) => {
    e.preventDefault();

    try {
      const validTask = todoTaskValidation.parse({
        title,
        description,
        priority,
      });
      if (todoId != "") {
        dispatch(updateTodo({ ...validTask, todoId }));
      } else {
        dispatch(addTodo(validTask));
      }
    } catch (error) {
      if (error instanceof ZodError) {
        alert(error.message);
      } else {
        return;
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-6 bg-blue-400 hover:bg-blue-600">
          {btnState === "addNewTodo" ? (
            "Add New Todo"
          ) : btnState === "updateTodo" ? (
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          ) : null}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmitBtn}>
          <DialogHeader>
            <DialogTitle>
              {btnState === "addNewTodo"
                ? "Add New Todo"
                : btnState === "updateTodo"
                ? "Update The Todo"
                : ""}
            </DialogTitle>
            <DialogDescription>Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="taskTitle" className="text-right">
                Task Title
              </Label>
              <Input
                id="taskTitle"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>

              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="Type your message here."
              />
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="taskPrioritySelect" className="text-right">
                Task Priority
              </Label>
              <Select onValueChange={(value) => setPriority(value)}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder={priority} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save Todo</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
