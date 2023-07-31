export interface MovieProps {
  id?: string
  user_id?: string
  title: string
  age: string
  image: string
  sinopse: string
  created_at?: Date
  updated_at?: Date
}

export interface MovieRepository {
  createMovie(movieData: MovieProps): Promise<MovieProps>

  readAllMovie(): Promise<MovieProps[]>

  findMovieById(id: string): Promise<MovieProps | null>

  updateMovie(movieData: MovieProps): Promise<MovieProps | null>

  deleteMovie(id: string): Promise<void>
}
