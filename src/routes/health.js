import { Router } from "express";

const healthRouter = new Router();

healthRouter.get("/", (_req, res) => {
  return res.sendStatus(200);
});

export default healthRouter;
