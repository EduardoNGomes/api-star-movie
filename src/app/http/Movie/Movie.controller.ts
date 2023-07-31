import { Request, Response } from 'express'
import {MovieService} from '../../service/movie/movie-service'

const movieService = new MovieService()

const createMovie = async (req: Request, res: Response) => {
  const body = req.body
  const response = movieService.createMovie(body)
  
  res.status(201).json({message:'Cheguei aqui'})
}

const readAllMovies = async (req: Request, res: Response) => {
  const response = await movieService.readAllMovies()
  res.status(200).json(response)
}

const findMovieById = async (req: Request, res: Response) => {
  const id = req.params.id
  console.log('id:', id)
  const response = await movieService.findMovieById(id)
  res.status(200).json(response)
}

const updateMovie = async (req: Request, res: Response) => {
  const id = req.params.id
  const body = req.body
  const response = await movieService.updateMovie(id, body)
  res.status(200).json(response)
}

const deleteMovie = async (req: Request, res: Response) => {
  const id = req.params.id
  const response = await movieService.deleteMovie(id)
  res.status(200).json(response)
}

export {
  createMovie,
  findMovieById,
  readAllMovies,
  updateMovie,
  deleteMovie
}

