import { Router } from "express";
import {
  getAllTodos,
  getSpecificTodo,
  postTodo,
  removeSpecificTodo,
  removeAllTodos
} from "../controllers/todo";

const todoRouter = new Router();

todoRouter.get("/:id", getSpecificTodo);
todoRouter.get("/", getAllTodos);
todoRouter.post("/", postTodo);
todoRouter.delete("/:id", removeSpecificTodo);
todoRouter.delete("/", removeAllTodos);

export default todoRouter;
