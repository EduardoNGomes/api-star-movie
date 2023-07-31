import { Router } from 'express'
import { createMovie } from './Movie.controller'

const movieRouter = Router()

movieRouter.get('/', createMovie)

export { movieRouter }
