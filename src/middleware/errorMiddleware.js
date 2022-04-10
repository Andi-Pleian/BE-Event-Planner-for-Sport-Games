import { HttpError } from "express-openapi-validator/dist/framework/types";
import { SWAGGER_ERROR } from "../util/errors";

/**
 * @description Express middleware to handle application errors
 */
export default (err, _req, res, next) => {
  const status = err.status || 500;
  let type = err.type || "unexpected-error";
  let detail = err.detail || "Something unexpected happened";
  const placement = err.placement || "global";

  if (err instanceof HttpError) {
    type = SWAGGER_ERROR.TYPE;
    detail = `Request${err.errors[0].path} ${err.errors[0].message}`;
  }

  return res.status(status).json({
    status,
    type,
    detail,
    placement
  });
};
