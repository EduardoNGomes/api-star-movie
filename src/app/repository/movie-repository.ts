export interface MovieProps {
  id?: string
  user_id: string
  title: string
  age: number
  image: string
  sinopse: string
  rating?: number
  created_at?: Date
  updated_at?: Date
}

export interface MovieRepository {
  createMovie(movieData: MovieProps): Promise<MovieProps>

  readAllMovie(): Promise<MovieProps[]>

  findMovieById(id: string): Promise<MovieProps | null>

  updateMovie(id: string, rating: number): Promise<MovieProps | null>

  deleteMovie(id: string): Promise<string>
}
