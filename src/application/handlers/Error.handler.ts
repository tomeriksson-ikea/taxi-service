import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors/Errors";
import { Responder } from "../utils/Responder";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const responder = new Responder(res);

  if (error instanceof BadRequestError) {
    return responder.badRequest({
      error: error.name,
      message: error.message
    });
  }

  if (error instanceof NotFoundError) {
    return responder.notFound({
      error: error.name,
      message: error.message
    });
  }

  return responder.internalServerError({
    error: "InternalServerError",
    message: error.message
  });
};
