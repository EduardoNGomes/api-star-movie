import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: 'validation error.', issues: error.format() })
  }

  return res.status(500).json({ message: 'internal server error.' })
}
