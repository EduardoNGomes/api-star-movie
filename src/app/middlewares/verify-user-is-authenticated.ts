import { verify } from 'jsonwebtoken'

import { jwtConfigAuth } from '../configs/auth'
import { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/App-error'

function verifyUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token invalid', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, jwtConfigAuth.secret)
    if (typeof sub === 'string') {
      request.user = {
        sub,
      }
    }

    return next()
  } catch {
    throw new AppError('JWT invalid', 401)
  }
}

export { verifyUserAuthenticated }
