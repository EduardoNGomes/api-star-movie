import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../utils/App-error'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  console.log(error)
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: 'validation error.', issues: error.format() })
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message })
  }

  return res.status(500).json({ message: 'internal server error.' })
}
