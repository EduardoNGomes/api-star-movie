import { randomUUID } from 'crypto'
import { MovieProps, MovieRepository } from '../movie-repository'

export class InMemoryMovieRepository implements MovieRepository {
  items: MovieProps[] = []

  async createMovie(movieData: MovieProps) {
    const movieToCreate = {
      id: randomUUID(),
      ...movieData,
      created_at: new Date(),
      updated_at: new Date(),
    }
    this.items.push(movieToCreate)
    return movieToCreate
  }

  async readAllMovie() {
    return this.items
  }

  async findMovieById(id: string) {
    const movie = this.items.find((movie) => movie.id === id)

    if (!movie) {
      return null
    }
    return movie
  }

  async deleteMovie(id: string, user_id: string) {
    const newMovieList = this.items.filter(
      (movie) => movie.id !== id && movie.user_id === user_id,
    )

    this.items = newMovieList

    const message = 'deleted'
    return message
  }
}
