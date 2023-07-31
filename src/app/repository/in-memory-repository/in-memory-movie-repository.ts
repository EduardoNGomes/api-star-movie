import { MovieProps, MovieRepository } from '../movie-repository'

export class InMemoryMovieRepository implements MovieRepository {
  items: MovieProps[] = []

  async createMovie(movieData: MovieProps) {
    this.items.push(movieData)
    return movieData
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

  async updateMovie(movieData: MovieProps) {
    const index = this.items.findIndex((movie) => movie.id === movieData.id)

    if (index === -1) {
      return null
    }
    const updatedMovies = this.items.map((movie) =>
      movie.id === movieData.id ? movieData : movie,
    )

    this.items = updatedMovies
    return movieData
  }

  async deleteMovie(id: string) {
    const newMovieList = this.items.filter((movie) => movie.id !== id)

    this.items = newMovieList
  }
}
