import { UserRepository } from '@/app/repository/user-repository'
import { MovieProps, MovieRepository } from '../../repository/movie-repository'
import { AppError } from '@/app/utils/App-error'

export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private userRepository: UserRepository,
  ) {}

  createMovie = async (data: MovieProps) => {
    const userExists = await this.userRepository.findByUserId(data.user_id)

    if (!userExists) {
      throw new AppError('User invalid', 409)
    }

    const movie = await this.movieRepository.createMovie(data)
    return { movie }
  }

  readAllMovies = async () => {
    const movies = await this.movieRepository.readAllMovie()
    return { movies }
  }

  findMovieById = async (id: string) => {
    const movie = await this.movieRepository.findMovieById(id)

    if (!movie) {
      throw new AppError('User invalid', 409)
    }
    return { movie }
  }

  deleteMovie = async (id: string) => {
    const message = await this.movieRepository.deleteMovie(id)
    return { message }
  }
}
