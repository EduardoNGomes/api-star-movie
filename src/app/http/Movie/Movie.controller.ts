import { Request, Response } from 'express'
import { MovieService } from '../../service/movie/movie-service'
import { KnexMovieRepository } from '@/app/repository/knex-repository/movie-repository'
import { KnexUserRepository } from '@/app/repository/knex-repository/user-repository'
import { z } from 'zod'
import { AppError } from '@/app/utils/App-error'
import { KnexCommentsRepository } from '@/app/repository/knex-repository/comments-repository'
import { CommentService } from '@/app/service/comments/comment-service'

import { createImageUrl } from '@/app/configs/cloudnary'

const movieRepository = new KnexMovieRepository()
const commentRepository = new KnexCommentsRepository()
const userRepository = new KnexUserRepository()

const movieService = new MovieService(movieRepository, userRepository)
const commentService = new CommentService(commentRepository)

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
  let ulrImage
  if (image) {
    try {
      const response = await createImageUrl(image.path)
      ulrImage = response?.url
    } catch (error) {
      console.log(error)
      throw new AppError('Error save image', 500)
    }
    dataToUpdate = {
      user_id: req.user.sub,
      age,
      sinopse,
      title,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      image: ulrImage!,
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

const readAllMovies = async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return res.status(401).json({ message: 'JWT invalid' })
  }

  try {
    const { movies } = await movieService.readAllMovies()
    return res.status(200).json({ movies })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

const findMovieById = async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return res.status(401).json({ message: 'JWT invalid' })
  }

  const paramSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramSchema.parse(req.params)

  try {
    const { movie } = await movieService.findMovieById(id)

    if (!movie.id) {
      return res.status(500).json({ message: 'internal error' })
    }
    const { comments } = await commentService.selectAll(movie.id)

    let sumRating = 0

    if (comments.length > 0) {
      comments.forEach((comment) => {
        sumRating += comment.rating_movie
      })
    }
    const averageRating = comments.length > 0 ? sumRating / comments.length : 0

    return res.status(201).json({ ...movie, averageRating, comments })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

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

export { createMovie, deleteMovie, readAllMovies, findMovieById }
