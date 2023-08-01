import { Request, Response } from 'express'
import { MovieService } from '../../service/movie/movie-service'
import { KnexMovieRepository } from '@/app/repository/knex-repository/movie-repository'
import { KnexUserRepository } from '@/app/repository/knex-repository/user-repository'

const movieRepository = new KnexMovieRepository()
const userRepository = new KnexUserRepository()

const movieService = new MovieService(movieRepository, userRepository)

const createMovie = async (req: Request, res: Response) => {
  const body = req.body

  res.status(201).json({ message: 'Cheguei aqui' })
}

const readAllMovies = async (req: Request, res: Response) => {}

const findMovieById = async (req: Request, res: Response) => {}

const updateMovie = async (req: Request, res: Response) => {}

const deleteMovie = async (req: Request, res: Response) => {}

export { createMovie, findMovieById, readAllMovies, updateMovie, deleteMovie }
