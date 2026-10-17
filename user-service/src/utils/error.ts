class AppError extends Error{
  public statusCode: number;
  public code:string
  constructor(message:string, statusCode:number, code:string) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError{
  constructor(message: string, code: "BAD_REQUEST") {
    super(message,400,code)
  }
}



class UnauthorizedError extends AppError{
  constructor(message: string, code: "UNAUTHORIZED") {
    super(message,401,code)
  }
}

class ForbiddenError extends AppError{
  constructor(message: string, code: "FORBIDDEN") {
    super(message,403,code)
  }
}



class NotFoundError extends AppError{
  constructor(message: string, code: "NOT_FOUND") {
    super(message,403,code)
  }
}

class ConflictError extends AppError{
  constructor(message: string, code: "CONFLICT") {
    super(message,409,code)
  }
}

class TooManyRequestsError extends AppError {
  constructor(message:string, code = 'TOO_MANY_REQUESTS') {
    super(message, 429, code);
  }
}


class InternalServerError extends AppError {
  constructor(message:"Internal Server Error", code = 'SERVER_ERROR') {
    super(message, 500, code);
  }
}

export const Errors = {
  AppError,
  BadRequestError,
  InternalServerError,
  TooManyRequestsError,
  ConflictError,
  NotFoundError
}