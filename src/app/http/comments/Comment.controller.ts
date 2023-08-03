import { KnexCommentsRepository } from '@/app/repository/knex-repository/comments-repository'
import { KnexMovieRepository } from '@/app/repository/knex-repository/movie-repository'
import { KnexUserRepository } from '@/app/repository/knex-repository/user-repository'

import { CommentService } from '@/app/service/comments/comment-service'
import { MovieService } from '@/app/service/movie/movie-service'
import { AppError } from '@/app/utils/App-error'
import { Request, Response } from 'express'
import { z } from 'zod'

const commentRepository = new KnexCommentsRepository()
const movieRepository = new KnexMovieRepository()
const userRepository = new KnexUserRepository()
const movieService = new MovieService(movieRepository, userRepository)
const commentsService = new CommentService(commentRepository, movieRepository)

const createComment = async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return res.status(401).json({ message: 'JWT invalid' })
  }
  const bodySchema = z.object({
    description: z.string(),
    rating_movie: z.coerce.number().min(0).max(5).default(0),
    comment_count: z.coerce.number(),
  })
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })
  const { id } = paramsSchema.parse(req.params)
  const { description, rating_movie, comment_count } = bodySchema.parse(
    req.body,
  )

  try {
    const [comment] = await Promise.all([
      await commentsService.createComment({
        description,
        rating_movie,
        user_id: req.user.sub,
        movie_id: id,
      }),
      await movieService.updateMovie(id, rating_movie, comment_count),
    ])

    return res.status(201).json(comment)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

const deleteComment = async (req: Request, res: Response) => {
  if (!req.user?.sub) {
    return res.status(401).json({ message: 'JWT invalid' })
  }

  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(req.params)

  try {
    const { msg } = await commentsService.delete(id)

    return res.status(201).json(msg)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.message)
    } else {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

export { createComment }
