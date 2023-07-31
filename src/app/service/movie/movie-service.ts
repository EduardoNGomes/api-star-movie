import { MovieProps, MovieRepository } from '../../repository/movie-repository'

export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  createMovie = async (data: MovieProps) => {
    const response = await this.movieRepository.createMovie(data)
    return { response }
  }

  readAllMovies = async () => {
    const response = await this.movieRepository.readAllMovie()
    return { response }
  }

  findMovieById = async (id: string) => {
    const response = await this.movieRepository.findMovieById(id)
    return { response }
  }

  updateMovie = async (data: MovieProps) => {
    const response = await this.movieRepository.updateMovie(data)
    return { response }
  }

  deleteMovie = async (id: string) => {
    const response = await this.movieRepository.deleteMovie(id)
    return { response }
  }
}
