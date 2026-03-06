import ErrorHandler from "../utils/ErrorHandler.js";

export const errorMiddleware = (err, req, res, next) => {
  // default values
  let statusCode = err?.statusCode || 500;
  let message = err?.message || "Internal Server Error";

  // Mongo duplicate key
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    message = `Duplicate value entered for ${field}`;
    statusCode = 400;
  }

  // Mongoose cast error
  if (err?.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 400;
  }

  // JWT errors
  if (err?.name === "JsonWebTokenError") {
    message = "Invalid token";
    statusCode = 401;
  }

  if (err?.name === "TokenExpiredError") {
    message = "Token expired";
    statusCode = 401;
  }

  // Mongoose validation errors
  if (err?.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((v) => v.message)
      .join(", ");
    statusCode = 400;
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
