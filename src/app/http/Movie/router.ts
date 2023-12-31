import { Router } from 'express'
import {
  createMovie,
  deleteMovie,
  readAllMovies,
  findMovieById,
} from './Movie.controller'
import { verifyUserAuthenticated } from '@/app/middlewares/verify-user-is-authenticated'
import multer from 'multer'

import { MULTER } from '@/app/configs/multer'

const movieRouter = Router()
const upload = multer(MULTER)

movieRouter.post(
  '/',
  verifyUserAuthenticated,
  upload.single('image'),
  createMovie,
)
movieRouter.get('/', verifyUserAuthenticated, readAllMovies)

movieRouter.get('/:id', verifyUserAuthenticated, findMovieById)

movieRouter.delete('/:id', verifyUserAuthenticated, deleteMovie)

export { movieRouter }
