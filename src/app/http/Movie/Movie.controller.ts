import { Request, Response } from 'express'
import { MovieService } from '../../service/movie/movie-service'
import { KnexMovieRepository } from '@/app/repository/knex-repository/movie-repository'
import { KnexUserRepository } from '@/app/repository/knex-repository/user-repository'
import { z } from 'zod'
import { AppError } from '@/app/utils/App-error'

const movieRepository = new KnexMovieRepository()
const userRepository = new KnexUserRepository()

const movieService = new MovieService(movieRepository, userRepository)

const createMovie = async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return res.status(401).json({ message: 'JWT invalid' })
  }

  const bodySchema = z.object({
    title: z.string(),
    age: z.coerce.number(),
    sinopse: z.string(),
  })

  const { age, sinopse, title } = bodySchema.parse(req.body)
  const image = req.file

  let dataToUpdate
  if (image) {
    dataToUpdate = {
      user_id: req.user.sub,
      age,
      sinopse,
      title,
      image: image.filename,
    }
  } else {
    return res.status(409).json({ message: 'Choose an image' })
  }
  try {
    const { movie } = await movieService.createMovie(dataToUpdate)
    return res.status(201).json(movie)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

// const readAllMovies = async (req: Request, res: Response) => {}

// const findMovieById = async (req: Request, res: Response) => {}

const deleteMovie = async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return res.status(401).json({ message: 'JWT invalid' })
  }

  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(req.params)

  try {
    const { message } = await movieService.deleteMovie(id, req.user.sub)
    return res.status(200).json({ message })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

export { createMovie, deleteMovie }
