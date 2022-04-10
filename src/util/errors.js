const ERROR_TYPES = {
  SWAGGER_ERROR: "swagger-error",
  NOT_FOUND: "not-found",
  INCORRECT_DATA: "incorrect-data"
};

export const SWAGGER_ERROR = {
  TYPE: ERROR_TYPES.SWAGGER_ERROR,
  DETAILS: "Swagger validation failed"
};

export const NO_TODO_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No todo was found"
};

export const NO_MESSAGE_PROVIDED = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No message was provided"
};

export const INCORRECT_ID = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "The id provided is incorrect"
};
