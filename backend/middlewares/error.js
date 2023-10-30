import ErrorHandler from "../utils/errorHandler.js";

export const errorMiddleware = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongoose object id error
  if(err.name === "CastError"){
    const message = `Cast Error: Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error
  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }
  
  // wrong jwt
  if(err.name === "JsonWebTokenError"){
    const message = "Invalid json web token. Try again";
    err = new ErrorHandler(message, 400);
  }

  // jwt expired error
  if(err.name === "TokenExpiredError"){
    const message = "Json web token is expired. Try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.stack
  })
}