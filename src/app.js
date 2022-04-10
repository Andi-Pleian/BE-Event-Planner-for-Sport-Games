import express from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerDocument from "../swagger/spec.yaml";
import errorMiddleware from "./middleware/errorMiddleware";
import healthRouter from "./routes/health";
import todoRouter from "./routes/todo";

const app = express();

app.use(express.json());
app.use(cors());

const IS_NOT_PRODUCTION = process.env.NODE_ENV !== "production";
if (IS_NOT_PRODUCTION) {
  app.use("/docs", serve, setup(swaggerDocument));
}

//  Swagger error validator
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true,
    validateResponses: true
  })
);

//  Declaring API routes
app.use("/health", healthRouter);
app.use("/todo", todoRouter);

//  Error handling
app.use(errorMiddleware);

export default app;
