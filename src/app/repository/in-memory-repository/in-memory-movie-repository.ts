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

  async updateMovie(id: string, rating: number, comment_count: number) {
    const index = this.items.findIndex((movie) => movie.id === id)

    if (index === -1) {
      return null
    }
    const updatedMovies = this.items.map((movie) =>
      movie.id === id ? { ...movie, rating, comment_count } : movie,
    )

    this.items = updatedMovies
    return this.items[index]
  }

  async deleteMovie(id: string) {
    const newMovieList = this.items.filter((movie) => movie.id !== id)

    this.items = newMovieList

    const message = 'deleted'
    return message
  }
}
