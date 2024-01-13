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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { FormEvent, useState } from "react";
import { ZodError, z } from "zod";

export function AddTodoBtn() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);

  const todoTaskValidation = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    priority: z.number().max(10),
  });
  const handleSubmitBtn = (e: FormEvent) => {
    e.preventDefault();

    try {
      const validTask = todoTaskValidation.parse({
        title,
        description,
        priority,
      });
      console.log({ validTask });
    } catch (error) {
      if (error instanceof ZodError) {
        // const errorArray = JSON.parse(error.message);
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
          Add Todo
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmitBtn}>
          <DialogHeader>
            <DialogTitle>Add New Todo</DialogTitle>
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
              <Label htmlFor="taskPriority" className="text-right">
                Task Priority
              </Label>
              <Input
                id="taskPriority"
                type="number"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="col-span-3"
              />
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
