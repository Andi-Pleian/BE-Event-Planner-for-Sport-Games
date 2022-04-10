import mongoose from "mongoose";
import Todo from "../models/todo";
import ProblemError from "../util/ProblemError";
import {
  NO_TODO_FOUND,
  NO_MESSAGE_PROVIDED,
  INCORRECT_ID
} from "../util/errors";

export const getAllTodos = async (_req, res, next) => {
  try {
    const todos = await Todo.find({});
    if (!todos.length)
      throw new ProblemError(404, NO_TODO_FOUND.TYPE, NO_TODO_FOUND.DETAILS);
    return res.status(200).send(todos);
  } catch (error) {
    next(error);
  }
};

export const getSpecificTodo = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ProblemError(400, INCORRECT_ID.TYPE, INCORRECT_ID.DETAILS);
    }

    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
      throw new ProblemError(404, NO_TODO_FOUND.TYPE, NO_TODO_FOUND.DETAILS);
    }
    return res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

export const postTodo = async (req, res, next) => {
  try {
    const message = req.body.message;
    if (!message.length)
      throw new ProblemError(
        400,
        NO_MESSAGE_PROVIDED.TYPE,
        NO_MESSAGE_PROVIDED.DETAILS
      );
    const newTodo = new Todo({
      message
    });
    await newTodo.save();
    return res.status(200).send(newTodo);
  } catch (error) {
    next(error);
  }
};

export const removeSpecificTodo = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ProblemError(400, INCORRECT_ID.TYPE, INCORRECT_ID.DETAILS);
    }

    const todo = await Todo.findOne({ _id: id });
    if (!todo)
      throw new ProblemError(404, NO_TODO_FOUND.TYPE, NO_TODO_FOUND.DETAILS);
    await Todo.deleteOne({ _id: id });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const removeAllTodos = async (_req, res, next) => {
  try {
    const todos = await Todo.find({});
    if (!todos.length)
      throw new ProblemError(404, NO_TODO_FOUND.TYPE, NO_TODO_FOUND.DETAILS);
    await Todo.deleteMany({});
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
