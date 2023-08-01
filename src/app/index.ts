import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { env } from '../env/index.js'
import { routes } from './http/routes/index.js'
import { ZodError } from 'zod'

const app = express()
app.use(express.json())

app.use(routes)

const errorHandler = (
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
app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`Server Film Fans is running on port ${env.PORT}`)
})

app.get('/v1/film-fans/check-live', (req, res) => {
  res.send("I'm live and breathing")
})
