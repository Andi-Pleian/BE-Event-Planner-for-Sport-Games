import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app";
import Todo from "../models/todo";

const request = supertest(app);

const todoBody = { message: "test" };

describe("todo controller", () => {
  describe("GET /todo/", () => {
    it("should return 200 status code when there is at least a todo in db", async () => {
      const newTodo = new Todo({
        message: "test"
      });
      await newTodo.save();
      const response = await request.get("/todo/");
      expect(response.status).toBe(200);
    });
    it("should return a todo", async () => {
      const newTodo = new Todo({
        message: "test"
      });
      await newTodo.save();
      const response = await request.get("/todo/");
      expect(response.body[0]).toEqual(expect.objectContaining(todoBody));
    });
    it("should return an empty array when there is no todo object in db", async () => {
      const response = await request.get("/todo/");
      expect(response.body).toStrictEqual({
        detail: "No todo was found",
        placement: "global",
        status: 404,
        type: "not-found"
      });
    });
  });
  describe("POST /todo/", () => {
    it("should return 200 status code when the todo has been added succesfully", async () => {
      const response = await request.post("/todo/").send(todoBody);
      expect(response.status).toBe(200);
    });
    it("should return the added todo when it was added succesfully", async () => {
      const response = await request.post("/todo/").send(todoBody);
      expect(response.body).toEqual(expect.objectContaining(todoBody));
    });
    it("should return a 400 error when message is empty", async () => {
      const response = await request.post("/todo/").send({ message: "" });
      expect(response.body).toStrictEqual({
        detail: "No message was provided",
        placement: "global",
        status: 400,
        type: "not-found"
      });
    });
  });
  describe("GET /todo/:id", () => {
    it("should return 200 status code when the todo has been found", async () => {
      const _id = mongoose.Types.ObjectId();
      const newTodo = new Todo({
        _id,
        message: "test"
      });
      await newTodo.save();
      const response = await request.get(`/todo/${_id}`);
      expect(response.status).toBe(200);
    });
    it("should return the added todo when it was added succesfully", async () => {
      const _id = mongoose.Types.ObjectId();
      const newTodo = new Todo({
        _id,
        message: "test"
      });
      await newTodo.save();
      const response = await request.get(`/todo/${_id}`);
      expect(response.body).toEqual(expect.objectContaining(todoBody));
    });
    it("should return a 404 error when the todo is not found", async () => {
      const id = mongoose.Types.ObjectId();
      const response = await request.get(`/todo/${id}`);
      expect(response.body).toStrictEqual({
        detail: "No todo was found",
        placement: "global",
        status: 404,
        type: "not-found"
      });
    });
  });
  describe("DELETE /todo/:id", () => {
    it("should return 200 status code when the todo has been found and deleted", async () => {
      const _id = mongoose.Types.ObjectId();
      const newTodo = new Todo({
        _id,
        message: "test"
      });
      await newTodo.save();
      const response = await request.delete(`/todo/${_id}`);
      expect(response.status).toBe(200);
    });
    it("should return a 400 error when the id is not valid", async () => {
      const response = await request.delete(`/todo/${123456789}`);

      expect(response.body).toStrictEqual({
        detail: "The id provided is incorrect",
        placement: "global",
        status: 400,
        type: "incorrect-data"
      });
    });
    it("should return a 404 error when the todo is not found", async () => {
      const id = mongoose.Types.ObjectId();
      const response = await request.delete(`/todo/${id}`);
      expect(response.body).toStrictEqual({
        detail: "No todo was found",
        placement: "global",
        status: 404,
        type: "not-found"
      });
    });
  });
  describe("DELETE /todo/", () => {
    it("should return 200 status code when the todos have been deleted", async () => {
      const newTodo = new Todo({
        message: "test"
      });
      await newTodo.save();
      const newTodo2 = new Todo({
        message: "test2"
      });
      await newTodo2.save();
      const response = await request.delete(`/todo/`);
      expect(response.status).toBe(200);
    });
    it("should return a 404 error when no todo is found in the db", async () => {
      const response = await request.delete("/todo/");
      expect(response.body).toStrictEqual({
        detail: "No todo was found",
        placement: "global",
        status: 404,
        type: "not-found"
      });
    });
  });
});
