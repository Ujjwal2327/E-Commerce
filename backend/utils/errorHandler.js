class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // this is to call the parent constructor
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);  // this is to get the stack trace of the error in postman
  }
}

export default ErrorHandler;